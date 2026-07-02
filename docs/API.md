# 🔌 Yojanta — API Reference

This document covers every API endpoint in Yojanta — the method, URL, what to send, and what you get back.

**Base URL (Development):** `http://localhost:5000/api`  
**Base URL (Production):** `https://your-deployed-backend.onrender.com/api`

---

## 🔐 Authentication

Yojanta uses **JWT (JSON Web Token)** authentication.

- Public routes (register, login) — no token needed
- All other routes — send the token in the header like this:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📋 Quick Reference — All Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|:-------------:|-------------|
| POST | `/auth/register` | ❌ | Register new user |
| POST | `/auth/login` | ❌ | Login, get JWT token |
| GET | `/users/profile` | ✅ | Get your profile |
| PUT | `/users/profile` | ✅ | Update your profile |
| GET | `/schemes` | ✅ | Get all schemes |
| GET | `/schemes/:id` | ✅ | Get one scheme |
| POST | `/schemes` | ✅ Admin | Add new scheme |
| PUT | `/schemes/:id` | ✅ Admin | Update a scheme |
| DELETE | `/schemes/:id` | ✅ Admin | Archive a scheme |
| GET | `/eligibility` | ✅ | Get YOUR eligible schemes |
| POST | `/opted` | ✅ | Opt into a scheme |
| GET | `/opted` | ✅ | Get your opted schemes |
| PUT | `/opted/:id` | ✅ | Update application status |

---

## 1. AUTH ROUTES

### POST `/api/auth/register`
Create a new user account.

**No token required.**

**Request Body:**
```json
{
  "user_name": "madhulika123",
  "email": "madhulika@example.com",
  "password": "SecurePass@123",
  "name": "Madhulika Damodara"
}
```

**Success Response — 201 Created:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64abc1234567890abcdef123",
    "user_name": "madhulika123",
    "name": "Madhulika Damodara",
    "email": "madhulika@example.com"
  }
}
```

**Error Responses:**
```json
400 Bad Request
{ "error": "Email already registered" }

400 Bad Request
{ "error": "All fields are required" }
```

---

### POST `/api/auth/login`
Login with email and password. Returns a JWT token.

**No token required.**

**Request Body:**
```json
{
  "email": "madhulika@example.com",
  "password": "SecurePass@123"
}
```

**Success Response — 200 OK:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64abc1234567890abcdef123",
    "user_name": "madhulika123",
    "name": "Madhulika Damodara",
    "email": "madhulika@example.com"
  }
}
```

**Error Responses:**
```json
400 Bad Request
{ "error": "Invalid email or password" }

404 Not Found
{ "error": "User not found" }
```

---

## 2. USER ROUTES

### GET `/api/users/profile`
Get the currently logged-in user's profile.

**Token required ✅**

**Request Body:** None

**Success Response — 200 OK:**
```json
{
  "_id": "64abc1234567890abcdef123",
  "user_name": "madhulika123",
  "name": "Madhulika Damodara",
  "email": "madhulika@example.com",
  "dob": "2002-05-15T00:00:00.000Z",
  "gender": "Female",
  "income": 250000,
  "occupation": "Student",
  "state": "Andhra Pradesh",
  "category": "OBC",
  "created_at": "2025-01-10T08:30:00.000Z"
}
```

---

### PUT `/api/users/profile`
Update the currently logged-in user's profile.

**Token required ✅**

**Request Body** (send only the fields you want to update):
```json
{
  "name": "Madhulika D",
  "dob": "2002-05-15",
  "gender": "Female",
  "income": 250000,
  "occupation": "Student",
  "state": "Andhra Pradesh",
  "category": "OBC"
}
```

**Success Response — 200 OK:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "64abc1234567890abcdef123",
    "name": "Madhulika D",
    "email": "madhulika@example.com",
    "gender": "Female",
    "income": 250000,
    "state": "Andhra Pradesh",
    "category": "OBC"
  }
}
```

---

## 3. SCHEME ROUTES

### GET `/api/schemes`
Get all government schemes. Supports filtering via query parameters.

**Token required ✅**

**Query Parameters (all optional):**

| Parameter | Type | Example | Description |
|-----------|------|---------|-------------|
| `category` | String | `?category=Education` | Filter by category |
| `gender` | String | `?gender=Female` | Filter by gender |
| `state` | String | `?state=Andhra Pradesh` | Filter by state |
| `deadline` | String | `?deadline=upcoming` | Only show active schemes |
| `search` | String | `?search=kisan` | Search scheme names |

**Example Request:**
```
GET /api/schemes?category=Education&gender=Female
```

**Success Response — 200 OK:**
```json
{
  "count": 2,
  "schemes": [
    {
      "_id": "64xyz7890abcdef123456789",
      "scheme_name": "National Scholarship Portal - Central Sector Scheme",
      "category": "Education",
      "department": "Ministry of Education",
      "min_income": 0,
      "max_income": 800000,
      "min_age": 18,
      "max_age": 35,
      "deadline": "2025-12-31T00:00:00.000Z",
      "documents": ["Aadhar Card", "Income Certificate", "Marksheet"],
      "gender": "All"
    },
    {
      "_id": "64xyz7890abcdef987654321",
      "scheme_name": "Pragati Scholarship for Girls",
      "category": "Education",
      "department": "AICTE",
      "min_income": 0,
      "max_income": 800000,
      "min_age": 18,
      "max_age": 30,
      "deadline": "2025-11-30T00:00:00.000Z",
      "documents": ["Aadhar Card", "Income Certificate", "Admission Letter"],
      "gender": "Female"
    }
  ]
}
```

---

### GET `/api/schemes/:id`
Get details of one specific scheme.

**Token required ✅**

**Example Request:**
```
GET /api/schemes/64xyz7890abcdef123456789
```

**Success Response — 200 OK:**
```json
{
  "_id": "64xyz7890abcdef123456789",
  "scheme_name": "National Scholarship Portal - Central Sector Scheme",
  "category": "Education",
  "department": "Ministry of Education",
  "min_income": 0,
  "max_income": 800000,
  "min_age": 18,
  "max_age": 35,
  "deadline": "2025-12-31T00:00:00.000Z",
  "documents": ["Aadhar Card", "Income Certificate", "Marksheet"],
  "gender": "All",
  "source_id": "gov_sch_001",
  "last_synced": "2025-06-24T00:00:00.000Z"
}
```

**Error Response:**
```json
404 Not Found
{ "error": "Scheme not found" }
```

---

### POST `/api/schemes`
Add a new scheme manually. **Admin only.**

**Token required ✅ | Admin role required ✅**

**Request Body:**
```json
{
  "scheme_name": "PM Vishwakarma Yojana",
  "category": "Skill Development",
  "department": "Ministry of Skill Development",
  "min_income": 0,
  "max_income": 500000,
  "min_age": 18,
  "max_age": 60,
  "deadline": "2026-03-31",
  "documents": ["Aadhar Card", "Caste Certificate", "Bank Passbook"],
  "gender": "All"
}
```

**Success Response — 201 Created:**
```json
{
  "message": "Scheme added successfully",
  "scheme": {
    "_id": "64newscheme123456789abc",
    "scheme_name": "PM Vishwakarma Yojana",
    "category": "Skill Development"
  }
}
```

---

### PUT `/api/schemes/:id`
Update an existing scheme. **Admin only.**

**Token required ✅ | Admin role required ✅**

**Request Body** (send only fields to update):
```json
{
  "deadline": "2026-06-30",
  "max_income": 600000
}
```

**Success Response — 200 OK:**
```json
{
  "message": "Scheme updated successfully",
  "scheme": {
    "_id": "64xyz7890abcdef123456789",
    "scheme_name": "PM Vishwakarma Yojana",
    "deadline": "2026-06-30T00:00:00.000Z",
    "max_income": 600000
  }
}
```

---

### DELETE `/api/schemes/:id`
Archive/remove a scheme. **Admin only.**

**Token required ✅ | Admin role required ✅**

**Success Response — 200 OK:**
```json
{
  "message": "Scheme archived successfully"
}
```

---

## 4. ELIGIBILITY ROUTE

### GET `/api/eligibility`
Get all schemes that the currently logged-in user is eligible for, based on their profile.

**Token required ✅**

This is the **core feature** of Yojanta. The backend automatically:
- Reads your profile (age, income, gender, category)
- Filters ALL schemes in the database
- Returns only the ones you qualify for

**Request Body:** None

**Success Response — 200 OK:**
```json
{
  "count": 5,
  "schemes": [
    {
      "_id": "64xyz7890abcdef123456789",
      "scheme_name": "National Scholarship Portal - Central Sector Scheme",
      "category": "Education",
      "department": "Ministry of Education",
      "deadline": "2025-12-31T00:00:00.000Z",
      "documents": ["Aadhar Card", "Income Certificate", "Marksheet"],
      "already_opted": false
    },
    {
      "_id": "64xyz7890abcdef987654321",
      "scheme_name": "Pragati Scholarship for Girls",
      "category": "Education",
      "department": "AICTE",
      "deadline": "2025-11-30T00:00:00.000Z",
      "documents": ["Aadhar Card", "Income Certificate", "Admission Letter"],
      "already_opted": true
    }
  ]
}
```

**Error Response:**
```json
400 Bad Request
{ "error": "Please complete your profile to see eligible schemes" }
```

---

## 5. OPTED SCHEMES ROUTES

### POST `/api/opted`
Opt into a scheme — adds it to your personal tracker.

**Token required ✅**

**Request Body:**
```json
{
  "scheme_id": "64xyz7890abcdef123456789"
}
```

**Success Response — 201 Created:**
```json
{
  "message": "Successfully opted into scheme",
  "opted_scheme": {
    "_id": "64opted123456789abcdef",
    "user_id": "64abc1234567890abcdef123",
    "scheme_id": "64xyz7890abcdef123456789",
    "applied_date": "2025-06-24T10:30:00.000Z",
    "status": "opted"
  }
}
```

**Error Response:**
```json
400 Bad Request
{ "error": "You have already opted into this scheme" }
```

---

### GET `/api/opted`
Get all schemes you have opted into or applied for.

**Token required ✅**

**Success Response — 200 OK:**
```json
{
  "count": 2,
  "opted_schemes": [
    {
      "_id": "64opted123456789abcdef",
      "scheme_id": {
        "_id": "64xyz7890abcdef123456789",
        "scheme_name": "National Scholarship Portal",
        "category": "Education",
        "deadline": "2025-12-31T00:00:00.000Z"
      },
      "applied_date": "2025-06-24T10:30:00.000Z",
      "status": "opted"
    },
    {
      "_id": "64opted987654321fedcba",
      "scheme_id": {
        "_id": "64xyz7890abcdef987654321",
        "scheme_name": "Pragati Scholarship for Girls",
        "category": "Education",
        "deadline": "2025-11-30T00:00:00.000Z"
      },
      "applied_date": "2025-06-20T09:00:00.000Z",
      "status": "applied"
    }
  ]
}
```

---

### PUT `/api/opted/:id`
Update the status of an opted scheme.

**Token required ✅**

**Status Lifecycle:**
```
opted → applied → approved
                → rejected
```

**Request Body:**
```json
{
  "status": "applied"
}
```

**Valid status values:** `opted` | `applied` | `approved` | `rejected`

**Success Response — 200 OK:**
```json
{
  "message": "Status updated successfully",
  "opted_scheme": {
    "_id": "64opted123456789abcdef",
    "status": "applied"
  }
}
```

---

## 6. HTTP Status Codes Used

| Code | Meaning | When it happens |
|------|---------|----------------|
| `200` | OK | Successful GET or PUT |
| `201` | Created | Successful POST (new record created) |
| `400` | Bad Request | Missing fields, duplicate entry, validation error |
| `401` | Unauthorized | No token, expired token, or wrong token |
| `403` | Forbidden | Valid token but not enough permission (e.g. non-admin) |
| `404` | Not Found | Scheme or user does not exist |
| `500` | Server Error | Something unexpected broke on the backend |

---

## 7. Testing with Postman

1. Download and install [Postman](https://www.postman.com/)
2. Create a new Collection called **"Yojanta API"**
3. Set a Collection Variable: `base_url = http://localhost:5000/api`
4. After login, copy the token → set another variable: `token = <your token>`
5. For protected routes, go to **Authorization tab** → select **Bearer Token** → use `{{token}}`

**Recommended testing order:**
```
1. POST /auth/register      ← create account
2. POST /auth/login         ← get token
3. PUT  /users/profile      ← fill in profile details
4. GET  /eligibility        ← see your matched schemes
5. POST /opted              ← opt into one
6. GET  /opted              ← confirm it appears in tracker
7. PUT  /opted/:id          ← update status to "applied"
```

---

*For architecture details see [ARCHITECTURE.md](./ARCHITECTURE.md)*  
*For setup instructions see [README.md](../README.md)*
