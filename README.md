# Yojantha 🇮🇳
### AI-Powered Access to Government Schemes

Yojantha bridges the gap between citizens and government welfare schemes by intelligently matching users to schemes they're eligible for — based on their profile, income, age, gender, and category.

> Built with React, Node.js, Express.js, MongoDB, and JWT Authentication

---

## 🚀 Features

- **Personalized Recommendations** — AI-based eligibility matching across 100+ government schemes
- **Smart Profile System** — Users fill their profile once; the system finds all relevant schemes
- **Application Tracking** — Track opted schemes, deadlines, and renewal dates
- **Auto Data Sync** — Cron jobs fetch and update scheme data from data.gov.in automatically
- **Secure Auth** — JWT-based login with bcrypt password encryption
- **Admin Panel** — Manage schemes, monitor sync, verify users

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Automation | node-cron |
| API | data.gov.in |

---

## 📁 Project Structure

Yojantha/

├── frontend/        # React app

│   └── src/

│       ├── pages/   # Login, Home, Schemes, Dashboard

│       └── components/

├── backend/         # Node.js + Express API

│   ├── routes/

│   ├── models/

│   └── controllers/

---

## ⚙️ Setup & Run Locally

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Steps

```bash
# Clone the repo
git clone https://github.com/MadhulikaDamodara/Yojanta.git
cd Yojanta

# Backend setup
cd backend
npm install
# Create a .env file with:
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_secret
node index.js

# Frontend setup (new terminal)
cd frontend
npm install
npm start
```

---

## 📊 Data Schema

| Collection | Key Fields |
|---|---|
| Users | user_id, name, email, dob, income, gender, category |
| Schemes | scheme_id, name, category, dept, age range, income range, deadline |
| OptedSchemes | user_id, scheme_id, applied_date, status |

---

## 🔮 Roadmap

- [ ] AI chatbot for scheme queries
- [ ] Multilingual support
- [ ] Document upload and verification
- [ ] Mobile app version

---

## 👩‍💻 Developer

**Damodara Lakshmi Madhulika**  
B.E. Information Technology — CBIT, Hyderabad  
[LinkedIn](https://www.linkedin.com/in/damodara-lakshmi-madhulika-402532324/) • [GitHub](https://github.com/MadhulikaDamodara)
