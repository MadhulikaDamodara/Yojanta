# 🛠️ Installation Guide — Yojanta

Step-by-step instructions to run Yojanta locally on your machine.

---

## Prerequisites

Make sure you have the following installed before starting:

| Tool | Version | Check | Download |
|------|---------|-------|----------|
| Node.js | v18 or higher | `node -v` | [nodejs.org](https://nodejs.org) |
| npm | v9 or higher | `npm -v` | Included with Node.js |
| Git | Any recent | `git --version` | [git-scm.com](https://git-scm.com) |
| MongoDB | Local v6+ or Atlas | — | [mongodb.com](https://www.mongodb.com) |

You will also need:
- A free **data.gov.in** API key → [Register here](https://data.gov.in/user/register)
- A free **Google Gemini** API key → [Get here](https://aistudio.google.com/app/apikey)

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/MadhulikaDamodara/Yojanta.git
cd Yojanta
```

---

## Step 2 — Backend Setup

### 2a. Install dependencies

```bash
cd backend
npm install
```

### 2b. Create the environment file

Copy the example file and fill in your values:

```bash
cp ../.env.example .env
```

Open `.env` and set:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/yojanta
JWT_SECRET=your_strong_secret_key_minimum_32_chars
JWT_EXPIRES_IN=24h
DATA_GOV_IN_API_KEY=your_data_gov_in_api_key
GEMINI_API_KEY=your_google_gemini_api_key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

> **MongoDB Atlas users:** Replace `MONGO_URI` with your Atlas connection string:
> `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/yojanta`

### 2c. Start the backend server

```bash
npm run dev       # development — auto-restarts on file changes (nodemon)
# OR
npm start         # production
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
Cron job scheduled: daily sync at midnight
```

---

## Step 3 — Frontend Setup

Open a **new terminal** tab/window.

### 3a. Install dependencies

```bash
cd frontend
npm install
```

### 3b. Create the environment file

```bash
# Create frontend/.env
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

Or create manually — create a file called `.env` inside the `frontend/` folder with:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3c. Start the frontend

```bash
npm start
```

The React app opens automatically at [http://localhost:3000](http://localhost:3000)

---

## Step 4 — Verify Everything Works

Open [http://localhost:3000](http://localhost:3000) and:

- [ ] Home page loads
- [ ] Register a new account
- [ ] Login with your credentials
- [ ] Fill in your profile (age, income, gender, category, state)
- [ ] Dashboard shows eligible schemes
- [ ] Chatbot responds

---

## Both Terminals Should Look Like This

```
Terminal 1 (Backend)          Terminal 2 (Frontend)
──────────────────────        ──────────────────────
cd Yojanta/backend            cd Yojanta/frontend
npm run dev                   npm start
                              
→ Port 5000                   → Port 3000
→ MongoDB connected           → Browser opens
→ Cron job active             → React app running
```

---

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot connect to MongoDB` | MongoDB not running | Start MongoDB: `mongod` or use Atlas |
| `Port 5000 already in use` | Another process using port | Change `PORT=5001` in `.env` |
| `JWT_SECRET is not defined` | Missing `.env` file | Create `.env` in `/backend` |
| `ENOENT: .env not found` | Wrong directory | Make sure you are in `/backend` |
| `npm install` fails | Node version too old | Upgrade to Node.js v18+ |
| `CORS error` in browser | Frontend URL mismatch | Check `FRONTEND_URL` in backend `.env` |
| Schemes not loading | data.gov.in key missing | Add `DATA_GOV_IN_API_KEY` to `.env` |
| Chatbot not responding | Gemini key missing | Add `GEMINI_API_KEY` to `.env` |

---

## Project Port Summary

| Service | Port | URL |
|---------|------|-----|
| Backend API | 5000 | http://localhost:5000 |
| Frontend React | 3000 | http://localhost:3000 |
| MongoDB | 27017 | mongodb://localhost:27017 |

---

## Stopping the Servers

In each terminal, press `Ctrl + C` to stop.

---

*For deployment instructions see [DEPLOYMENT.md](./DEPLOYMENT.md)*
*For API reference see [docs/API.md](./docs/API.md)*
