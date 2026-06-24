# 🇮🇳 Yojanta — AI-Powered Access to Government Schemes

<div align="center">

![Yojanta Banner](https://img.shields.io/badge/Yojanta-AI%20Powered%20Welfare%20Platform-blue?style=for-the-badge&logo=react)

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

**A centralized, intelligent web platform that connects Indian citizens with government welfare schemes through personalized eligibility matching, automated data ingestion, and real-time notifications.**

[Live Demo](#) · [Report Bug](https://github.com/MadhulikaDamodara/Yojanta/issues) · [Request Feature](https://github.com/MadhulikaDamodara/Yojanta/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Folder Structure](#-folder-structure)
- [Data Schemas](#-data-schemas)
- [Installation Guide](#-installation-guide)
- [Usage Guide](#-usage-guide)
- [Screenshots](#-screenshots)
- [API Endpoints](#-api-endpoints)
- [Future Enhancements](#-future-enhancements)
- [Challenges Faced](#-challenges-faced)
- [Learning Outcomes](#-learning-outcomes)
- [Contributors](#-contributors)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

**Yojanta** (derived from *Yojana* — the Hindi word for "scheme" or "plan") is a full-stack web application that simplifies access to Indian government welfare schemes by intelligently matching citizens with programs they are eligible for.

The platform analyzes user profiles against official scheme criteria sourced from **data.gov.in** and delivers personalized, accurate recommendations through a secure, intuitive interface. It bridges the gap between government welfare programs and citizens by reducing awareness barriers, simplifying complex eligibility rules, and preventing missed deadlines.

> **"Bridging the last mile between welfare policy and citizen benefit."**

---

## ❗ Problem Statement

The Government of India offers hundreds of welfare schemes targeting students, farmers, women, senior citizens, and economically weaker groups. Yet millions of eligible citizens never benefit due to:

- 🚫 **Lack of Awareness** — schemes are scattered across ministries and portals
- 🤯 **Complex Eligibility** — criteria involving income, age, caste, occupation, and state
- ⏰ **Missed Deadlines** — no proactive notification system for time-sensitive schemes
- 📄 **Static Information** — existing portals provide information but no personalized guidance
- 🗣️ **Language Barriers** — information available only in English or limited regional languages

This results in massive underutilization of government resources and missed opportunities for those who need them most.

---

## ✅ Solution

Yojanta addresses this gap by providing:

1. **Profile-Based Matching** — users create a profile; the system automatically evaluates and surfaces eligible schemes
2. **Centralized Database** — all schemes in one searchable, filterable repository
3. **Automated Data Sync** — cron jobs fetch fresh data from data.gov.in regularly
4. **Application Tracking** — users track which schemes they've applied for and their status
5. **Smart Notifications** — deadline reminders and new scheme alerts
6. **Admin Dashboard** — administrators can manage, verify, and monitor scheme data

---

## ✨ Key Features

### 👤 User Features
| Feature | Description |
|--------|-------------|
| Secure Auth | JWT-based registration and login with bcrypt password hashing |
| Profile Builder | Comprehensive profile: age, income, gender, occupation, category |
| Smart Dashboard | Personalized feed of eligible schemes based on profile |
| Scheme Search | Full-text search with category, department, and deadline filters |
| Application Tracker | Track opted schemes with status (opted / applied / approved) |
| Alerts & Reminders | Notifications for deadlines and newly added relevant schemes |

### ⚙️ System Features
| Feature | Description |
|--------|-------------|
| Centralized DB | MongoDB-backed scheme repository |
| Auto Data Sync | Scheduled cron jobs pull live data from data.gov.in API |
| Rule-Based Eligibility | Logic engine compares user profile against scheme criteria |
| Responsive UI | Mobile-friendly React frontend |

### 🛠️ Admin Features
| Feature | Description |
|--------|-------------|
| Scheme Management | Add, edit, archive schemes |
| Sync Monitoring | View last sync time, failed records |
| User Verification | Document and identity verification workflows |

---

## 🛠 Tech Stack

### Frontend
- **React.js** — Component-based UI
- **React Router DOM** — Client-side navigation
- **Axios** — HTTP client for API calls
- **CSS3** — Custom responsive styling

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — RESTful API framework
- **node-cron** — Scheduled task automation
- **Axios** — Fetching external government data

### Database
- **MongoDB** — NoSQL document database
- **Mongoose** — Object Data Modeling (ODM)

### Authentication & Security
- **JWT (jsonwebtoken)** — Stateless authentication
- **bcryptjs** — Password hashing

### External Integration
- **data.gov.in API** — Official Indian government open data source

### Dev Tools
- **VS Code** — IDE
- **Postman** — API testing
- **MongoDB Compass** — Database visualization
- **nodemon** — Auto-restart during development
- **Git & GitHub** — Version control

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│   React.js SPA  →  React Router  →  Axios HTTP Client       │
└────────────────────────────┬────────────────────────────────┘
                             │ REST API (JSON)
┌────────────────────────────▼────────────────────────────────┐
│                       BACKEND LAYER                          │
│   Express.js REST API                                        │
│   ├── Auth Routes (JWT Middleware)                           │
│   ├── User Routes                                            │
│   ├── Scheme Routes                                          │
│   ├── Eligibility Engine (Rule-Based Matching)               │
│   ├── Notification Service                                   │
│   └── Cron Job Scheduler (node-cron)                         │
└─────────────┬─────────────────────────┬────────────────────┘
              │ Mongoose ODM            │ Axios HTTP
┌─────────────▼──────────┐    ┌────────▼────────────────────┐
│      MongoDB Atlas      │    │     data.gov.in API          │
│  ├── users              │    │  Government Scheme Datasets  │
│  ├── schemes            │    └─────────────────────────────┘
│  ├── opted_schemes      │
│  └── notifications      │
└─────────────────────────┘
```

**Data Flow:**
1. User registers/logs in → JWT token issued
2. User submits profile → stored in MongoDB
3. Dashboard loads → eligibility engine cross-matches profile vs schemes
4. Cron job (daily) → fetches fresh schemes from data.gov.in → updates DB
5. Notification service → checks deadlines → sends alerts

---

## 📁 Folder Structure

```
Yojanta/
├── 📁 frontend/                  # React.js application
│   ├── 📁 public/
│   │   └── index.html
│   ├── 📁 src/
│   │   ├── 📁 components/        # Reusable UI components
│   │   │   ├── Navbar.js
│   │   │   ├── SchemeCard.js
│   │   │   └── Notification.js
│   │   ├── 📁 pages/             # Route-level page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Home.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Schemes.js
│   │   │   └── Profile.js
│   │   ├── 📁 context/           # React Context (Auth state)
│   │   ├── 📁 utils/             # Helper functions, Axios config
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── 📁 backend/                   # Node.js + Express API
│   ├── 📁 config/
│   │   └── db.js                 # MongoDB connection
│   ├── 📁 models/                # Mongoose schemas
│   │   ├── User.js
│   │   ├── Scheme.js
│   │   └── OptedScheme.js
│   ├── 📁 routes/                # Express route definitions
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── schemes.js
│   │   └── eligibility.js
│   ├── 📁 middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── 📁 controllers/           # Business logic
│   ├── 📁 jobs/
│   │   └── syncSchemes.js        # Cron job: data.gov.in sync
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── TODO.md
```

---

## 🗄 Data Schemas

### User
```json
{
  "user_id": "ObjectId",
  "user_name": "string",
  "email": "string (unique)",
  "password": "string (bcrypt hashed)",
  "dob": "Date",
  "name": "string",
  "gender": "string",
  "income": "number",
  "occupation": "string",
  "state": "string",
  "category": "string (General/OBC/SC/ST)"
}
```

### Scheme
```json
{
  "scheme_id": "ObjectId",
  "scheme_name": "string",
  "category": "string",
  "department": "string",
  "min_income": "number",
  "max_income": "number",
  "min_age": "number",
  "max_age": "number",
  "deadline": "Date",
  "documents_required": ["string"],
  "gender": "string (All/Male/Female)"
}
```

### OptedScheme
```json
{
  "user_id": "ObjectId (ref: User)",
  "scheme_id": "ObjectId (ref: Scheme)",
  "applied_date": "Date",
  "status": "enum [opted, applied, approved, rejected]"
}
```

---

## 🚀 Installation Guide

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm v9+
- data.gov.in API key ([get here](https://data.gov.in/))

### 1. Clone the Repository
```bash
git clone https://github.com/MadhulikaDamodara/Yojanta.git
cd Yojanta
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/yojanta
JWT_SECRET=your_jwt_secret_key_here
DATA_GOV_IN_API_KEY=your_api_key_here
```

Start the backend:
```bash
npm run dev    # development (nodemon)
npm start      # production
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in `/frontend`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

### 4. Access the App
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Usage Guide

1. **Register** — Create an account with your email and password
2. **Build Profile** — Fill in your personal details: age, income, gender, occupation, state, category
3. **View Dashboard** — See all schemes you're eligible for, ranked by relevance
4. **Explore Schemes** — Search and filter all available government schemes
5. **Opt-in** — Mark schemes you want to apply for; track them in your tracker
6. **Get Notified** — Receive alerts for upcoming deadlines and new schemes

---

## 📸 Screenshots

> 📌 *Screenshots coming soon — add your project screenshots to `/docs/screenshots/`*

| Screen | Description |
|--------|-------------|
| Login / Register | Secure authentication page with form validation |
| User Profile Setup | Multi-field profile form for eligibility matching |
| Dashboard | Personalized scheme recommendation feed |
| Scheme Explorer | Searchable, filterable scheme listing |
| Application Tracker | Table view of opted/applied schemes with status |
| Admin Panel | Scheme management and data sync monitoring |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get current user profile |
| PUT | `/api/users/profile` | Update user profile |

### Schemes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/schemes` | Get all schemes (filterable) |
| GET | `/api/schemes/:id` | Get scheme by ID |
| POST | `/api/schemes` | Add new scheme (Admin) |
| PUT | `/api/schemes/:id` | Update scheme (Admin) |

### Eligibility
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/eligibility` | Get schemes eligible for current user |

### Opted Schemes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/opted` | Opt into a scheme |
| GET | `/api/opted` | Get user's opted schemes |
| PUT | `/api/opted/:id` | Update application status |

---

## 🔮 Future Enhancements

- [ ] **Multilingual Support** — Hindi, Tamil, Telugu, Kannada, Marathi
- [ ] **Document Upload & Verification** — automated OCR + document checklist
- [ ] **Aadhar / DigiLocker Integration** — pre-fill profile data from official sources
- [ ] **Mobile App** — React Native for Android/iOS
- [ ] **Advanced Analytics** — scheme utilization heatmaps, demographic insights
- [ ] **Email/SMS Notifications** — via Nodemailer / Twilio
- [ ] **PWA Support** — offline access and installability
- [ ] **Government API Expansion** — beyond data.gov.in to state-level APIs
- [ ] **ML Recommendation Engine** — collaborative filtering for scheme discovery

---

## 🧗 Challenges Faced

1. **Inconsistent Government API Data** — data.gov.in datasets have varying schema formats; handled with normalization middleware
2. **Complex Eligibility Logic** — multi-dimensional matching (age + income + gender + category + state) required careful rule engine design
3. **JWT State Management** — managing token expiry and refresh across React components
4. **Cron Job Reliability** — ensuring scheduled syncs don't fail silently; added logging and error alerting
5. **Responsive UI for Diverse Users** — designing for both tech-savvy and first-time users

---

## 📚 Learning Outcomes

- Built a production-grade **MERN stack** application from scratch
- Implemented **JWT authentication** with role-based access control
- Integrated a **third-party government API** (data.gov.in) with automated synchronization
- Designed a **rule-based eligibility engine** for multi-criteria matching
- Used **node-cron** for reliable scheduled background tasks
- Applied **RESTful API design principles** with proper HTTP status codes
- Managed **MongoDB schema design** for relational-style data in a NoSQL environment

---

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/MadhulikaDamodara">
        <img src="https://github.com/MadhulikaDamodara.png" width="100px;" alt="Madhulika Damodara"/><br/>
        <sub><b>Madhulika Damodara</b></sub>
      </a><br/>
      <sub>Full Stack Developer</sub>
    </td>
  </tr>
</table>

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Madhulika Damodara**
- GitHub: [@MadhulikaDamodara](https://github.com/MadhulikaDamodara)
- Project Link: [https://github.com/MadhulikaDamodara/Yojanta](https://github.com/MadhulikaDamodara/Yojanta)

---

<div align="center">

⭐ **If you found this project helpful, please give it a star!** ⭐

*Built with ❤️ to bridge the gap between government welfare and Indian citizens*

</div>
