# 🏗️ Yojanta — System Architecture

This document explains how Yojanta is structured internally — how the frontend, backend, database, and external services connect and communicate.

---

## 1. High-Level Overview

Yojanta follows a classic **3-Tier Architecture**:

```
┌─────────────────────────────────────────┐
│         TIER 1 — PRESENTATION           │
│         React.js (Frontend SPA)         │
│  Login | Dashboard | Schemes | Profile  │
└─────────────────┬───────────────────────┘
                  │  HTTP REST API (JSON)
                  │  Authorization: Bearer <JWT>
┌─────────────────▼───────────────────────┐
│         TIER 2 — APPLICATION            │
│         Node.js + Express.js            │
│  Auth | Users | Schemes | Eligibility   │
│  Cron Job Scheduler | Notifications     │
└──────────┬──────────────────┬───────────┘
           │ Mongoose ODM     │ Axios HTTP
┌──────────▼──────┐   ┌───────▼───────────┐
│  TIER 3 — DATA  │   │  EXTERNAL SERVICE  │
│    MongoDB      │   │   data.gov.in API  │
│ users           │   │ Government Scheme  │
│ schemes         │   │ Datasets (daily)   │
│ opted_schemes   │   └───────────────────┘
└─────────────────┘
```

---

## 2. Frontend Architecture

**Technology:** React.js 18 (Single Page Application)

```
src/
├── context/
│   └── AuthContext.js       ← Stores JWT token + user globally
├── pages/
│   ├── Login.js             ← Auth form
│   ├── Register.js          ← New user signup
│   ├── Home.js              ← Landing page
│   ├── Dashboard.js         ← Personalized scheme feed
│   ├── Schemes.js           ← Browse all schemes
│   └── Profile.js           ← Edit user profile
├── components/
│   ├── Navbar.js            ← Navigation bar
│   ├── SchemeCard.js        ← Individual scheme display
│   └── Notification.js      ← Alert/reminder component
└── utils/
    └── axiosConfig.js       ← Base URL + JWT header injection
```

**How it works:**
- User visits the app → React Router decides which page to show
- AuthContext holds the JWT token so every page knows if user is logged in
- Axios automatically attaches the JWT token to every API request
- If token is missing/expired → user is redirected to Login

---

## 3. Backend Architecture

**Technology:** Node.js + Express.js

```
backend/
├── server.js               ← Entry point, starts Express + cron jobs
├── config/
│   └── db.js               ← MongoDB connection setup
├── middleware/
│   └── authMiddleware.js   ← Checks JWT token on protected routes
├── routes/
│   ├── auth.js             ← POST /register, POST /login
│   ├── users.js            ← GET/PUT /profile
│   ├── schemes.js          ← GET/POST/PUT /schemes
│   ├── eligibility.js      ← GET /eligibility
│   └── opted.js            ← GET/POST/PUT /opted
├── controllers/            ← Business logic for each route
├── models/
│   ├── User.js             ← User schema
│   ├── Scheme.js           ← Scheme schema
│   └── OptedScheme.js      ← Application tracker schema
└── jobs/
    └── syncSchemes.js      ← Cron job: fetch from data.gov.in daily
```

**How a request flows through the backend:**
```
Incoming Request
      │
      ▼
Express Router
      │
      ▼
authMiddleware.js        ← Checks: is JWT valid?
      │                     YES → continue | NO → 401 Unauthorized
      ▼
Controller Function      ← Runs the actual business logic
      │
      ▼
Mongoose Model           ← Reads/writes to MongoDB
      │
      ▼
JSON Response            ← Sent back to React frontend
```

---

## 4. Eligibility Engine

This is the core feature of Yojanta — matching users to schemes.

```
User opens Dashboard
        │
        ▼
Backend gets user profile from MongoDB
        │
        ▼
Calculate user's current age from date of birth
        │
        ▼
Build MongoDB query with ALL these filters at once:
   ┌────────────────────────────────────────┐
   │  scheme.min_age   <= user.age          │
   │  scheme.max_age   >= user.age          │
   │  scheme.min_income <= user.income      │
   │  scheme.max_income >= user.income      │
   │  scheme.gender == user.gender OR "All" │
   │  scheme.category == user.category      │
   │  scheme.deadline  >  today             │
   └────────────────────────────────────────┘
        │
        ▼
Return list of ALL matching schemes
        │
        ▼
Cross-check with opted_schemes → mark already-opted ones
        │
        ▼
Send to Dashboard → display to user
```

---

## 5. Data Sync Pipeline (Cron Job)

Yojanta automatically stays up to date with fresh government data every day.

```
Every day at midnight (node-cron)
        │
        ▼
Axios GET request → data.gov.in API
        │
        ▼
Receive raw JSON (varies by ministry/department)
        │
        ▼
Normalize: map varied field names → unified Scheme schema
        │
        ▼
For each scheme in response:
   ├── Already exists in DB? → UPDATE it
   └── New scheme?           → INSERT it
        │
        ▼
Log results:
   - How many added
   - How many updated
   - Any errors
        │
        ▼
Trigger notification check:
   - Any users newly eligible for added schemes?
   - Any deadlines within 7 days?
```

---

## 6. Authentication Flow

```
REGISTRATION:
User fills form → POST /api/auth/register
      │
      ▼
bcrypt hashes the password (10 salt rounds)
      │
      ▼
User saved to MongoDB (hashed password only)
      │
      ▼
JWT token generated → sent to frontend
      │
      ▼
Frontend stores token in AuthContext


LOGIN:
User fills form → POST /api/auth/login
      │
      ▼
Find user by email in MongoDB
      │
      ▼
bcrypt.compare(entered password, stored hash)
      │
   MATCH?
   YES → Generate JWT → send to frontend
   NO  → 401 Unauthorized


EVERY PROTECTED REQUEST:
Frontend sends: Authorization: Bearer <token>
      │
      ▼
authMiddleware.js verifies token signature + expiry
      │
   VALID?
   YES → attach user_id to request → continue
   NO  → 401 Unauthorized → frontend redirects to Login
```

---

## 7. Database Design

**3 Collections in MongoDB:**

```
users                          schemes
─────────────────              ──────────────────────
_id (ObjectId)                 _id (ObjectId)
user_name (String)             scheme_name (String)
email (String) ←── indexed     category (String) ←── indexed
password (String, hashed)      department (String)
name (String)                  min_income (Number)
dob (Date)                     max_income (Number)
gender (String)                min_age (Number)
income (Number)                max_age (Number)
occupation (String)            deadline (Date) ←── indexed
state (String)                 documents ([String])
category (String)              gender (String)
created_at (Date)              source_id (String)
                               last_synced (Date)

opted_schemes
──────────────────────────────
_id (ObjectId)
user_id (ObjectId) ──────────► references users._id
scheme_id (ObjectId) ────────► references schemes._id
applied_date (Date)
status (String: opted/applied/approved/rejected)
```

---

## 8. Security Architecture

| Layer | Protection |
|-------|-----------|
| Passwords | bcrypt hashed — never stored plain |
| API Routes | JWT middleware on all protected endpoints |
| Tokens | 24-hour expiry + HTTPS in production |
| CORS | Whitelisted to frontend origin only |
| Queries | Mongoose ODM prevents NoSQL injection |
| Secrets | .env file — never committed to Git |
| Responses | Passwords stripped before sending to client |

---

## 9. Tech Stack Summary

| Part | Technology | Why |
|------|-----------|-----|
| Frontend | React.js 18 | Component-based, fast SPA |
| Routing | React Router DOM | Client-side navigation |
| HTTP Client | Axios | Clean API calls with interceptors |
| Backend | Node.js + Express | Fast, JavaScript full-stack |
| Database | MongoDB + Mongoose | Flexible schema for varied scheme data |
| Auth | JWT + bcrypt | Stateless, secure, scalable |
| Scheduler | node-cron | Built-in Node.js cron scheduling |
| External Data | data.gov.in API | Official Indian government data source |

---

*For API details see [API.md](./API.md)*  
*For setup instructions see [README.md](../README.md)*
