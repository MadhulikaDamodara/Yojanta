# 🚀 Deployment Guide — Yojanta

How to deploy Yojanta for free using Render (backend), Vercel (frontend), and MongoDB Atlas (database).

---

## Overview

| Service | What it hosts | Free tier |
|---------|--------------|-----------|
| **MongoDB Atlas** | Database | 512 MB — enough for Yojanta |
| **Render** | Node.js backend API | 750 hrs/month free |
| **Vercel** | React frontend | Unlimited on free tier |

Total cost: **₹0 / $0** — all free.

---

## Step 1 — Set Up MongoDB Atlas (Database)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Click **"Build a Database"** → choose **Free (M0 Shared)**
3. Select a cloud provider (AWS recommended) and region closest to India
4. Set a **username and password** — save these, you'll need them
5. Under **Network Access** → click **"Add IP Address"** → select **"Allow Access from Anywhere"** (`0.0.0.0/0`)
6. Under **Database** → click **"Connect"** → **"Drivers"** → copy the connection string

Your connection string looks like:
```
mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/yojanta?retryWrites=true&w=majority
```

---

## Step 2 — Deploy Backend on Render

### 2a. Push your code to GitHub
Make sure your latest code is pushed to `github.com/MadhulikaDamodara/Yojanta`

### 2b. Create a Render account
Go to [render.com](https://render.com) → Sign up with GitHub

### 2c. Create a Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account → select the `Yojanta` repository
3. Fill in the settings:

| Field | Value |
|-------|-------|
| Name | `yojanta-backend` |
| Root Directory | `backend` |
| Environment | `Node` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Instance Type | `Free` |

### 2d. Add Environment Variables
In Render → your service → **"Environment"** tab → add all these:

```
PORT                    = 10000
MONGO_URI               = mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/yojanta
JWT_SECRET              = your_very_strong_secret_key_here
JWT_EXPIRES_IN          = 24h
DATA_GOV_IN_API_KEY     = your_data_gov_in_api_key
GEMINI_API_KEY          = your_google_gemini_api_key
FRONTEND_URL            = https://yojanta.vercel.app
NODE_ENV                = production
```

> Render uses port `10000` internally — use this as the `PORT` value.

### 2e. Deploy
Click **"Create Web Service"** — Render will build and deploy automatically.

Your backend URL will be:
```
https://yojanta-backend.onrender.com
```

> **Note:** Free Render services spin down after 15 minutes of inactivity and take ~30 seconds to wake up on first request. This is normal on the free tier.

---

## Step 3 — Deploy Frontend on Vercel

### 3a. Create a Vercel account
Go to [vercel.com](https://vercel.com) → Sign up with GitHub

### 3b. Import your project
1. Click **"Add New"** → **"Project"**
2. Import `MadhulikaDamodara/Yojanta` from GitHub
3. Configure:

| Field | Value |
|-------|-------|
| Framework Preset | `Create React App` |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `build` |

### 3c. Add Environment Variables
In Vercel → your project → **"Settings"** → **"Environment Variables"** → add:

```
REACT_APP_API_URL = https://yojanta-backend.onrender.com/api
```

### 3d. Deploy
Click **"Deploy"** — Vercel builds and deploys in ~2 minutes.

Your frontend URL will be:
```
https://yojanta.vercel.app
```

---

## Step 4 — Update CORS on Backend

Go back to Render → your service → **"Environment"** → update:

```
FRONTEND_URL = https://yojanta.vercel.app
```

Click **"Save Changes"** → Render redeploys automatically.

---

## Step 5 — Verify Deployment

1. Open `https://yojanta.vercel.app`
2. Register a new account
3. Fill in your profile
4. Verify the dashboard loads eligible schemes
5. Test the chatbot

---

## Deployment Architecture

```
User Browser
     │
     ▼
Vercel (Frontend)
https://yojanta.vercel.app
React.js build
     │
     │ HTTPS REST API calls
     ▼
Render (Backend)
https://yojanta-backend.onrender.com
Node.js + Express.js
     │                    │
     ▼                    ▼
MongoDB Atlas         Google Gemini API
(Database)            (AI Chatbot)
     ▲
     │ daily sync
data.gov.in API
```

---

## Updating Your Deployment

Every time you push to `main` on GitHub:
- **Render** auto-redeploys the backend
- **Vercel** auto-redeploys the frontend

No manual steps needed after initial setup.

---

## Custom Domain (Optional)

### Vercel custom domain:
1. Vercel → your project → **"Settings"** → **"Domains"**
2. Add your domain (e.g. `yojanta.in`)
3. Update DNS records as instructed by Vercel

### Render custom domain:
1. Render → your service → **"Settings"** → **"Custom Domains"**
2. Add your API domain (e.g. `api.yojanta.in`)

---

## Environment Variables Summary

### Backend (Render)
```env
PORT=10000
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
JWT_EXPIRES_IN=24h
DATA_GOV_IN_API_KEY=...
GEMINI_API_KEY=...
FRONTEND_URL=https://yojanta.vercel.app
NODE_ENV=production
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://yojanta-backend.onrender.com/api
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Backend not responding | Check Render logs under "Logs" tab |
| MongoDB connection error | Verify Atlas IP whitelist includes `0.0.0.0/0` |
| CORS error on frontend | Ensure `FRONTEND_URL` in Render matches exact Vercel URL |
| Vercel build fails | Check `Root Directory` is set to `frontend` |
| Render build fails | Check `Root Directory` is set to `backend` |
| Environment variable not found | Re-check spelling — they are case-sensitive |

---

*For local setup see [INSTALLATION.md](./INSTALLATION.md)*
