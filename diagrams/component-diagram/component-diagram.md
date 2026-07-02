# Yojanta — Component Diagram

> Render this file at [mermaid.live](https://mermaid.live) → export as PNG → save as `assets/architecture/component-diagram.png`

```mermaid
graph TB
    subgraph Browser["Browser — Presentation Tier"]
        subgraph ReactApp["React.js SPA"]
            LP[login.jsx]
            RP[register.jsx]
            DP[dashboard.jsx]
            SP[schemes.jsx]
            PP[profile.jsx]
            CP[chatbot.jsx]
            TP[myschemes.jsx]
            RC[recommendations.jsx]
            AX[Axios HTTP Client]
            AC[AuthContext]
        end
    end

    subgraph Backend["Node.js Server — Application Tier"]
        SV[server.js]
        subgraph Routes["Express Routes"]
            AR[authRoutes.js]
            UR[userRoutes.js]
            SR[schemeRoutes.js]
            AIR[aiRoutes.js]
            OR[optedRoutes.js]
            ER[eligibilityRoute.js]
        end
        MW[authMiddleware.js]
        EE[Eligibility Engine]
        CB[Chatbot.js]
        NS[Notification Service]
        CJ[node-cron Sync Job]
    end

    subgraph DataTier["Data Tier — MongoDB"]
        UC[(users)]
        SC[(schemes)]
        OC[(opted_schemes)]
        EM[(embeddings)]
    end

    subgraph External["External Services"]
        GV[data.gov.in API]
        GM[Google Gemini API]
    end

    AX -->|REST + JWT| SV
    AC --> AX
    LP & RP --> AR
    DP --> ER
    SP --> SR
    PP --> UR
    CP --> AIR
    TP --> OR
    RC --> AIR

    SV --> MW
    MW --> AR & UR & SR & AIR & OR & ER
    ER --> EE
    AIR --> CB
    CB --> GM
    EE --> SC
    EE --> UC
    AR --> UC
    UR --> UC
    SR --> SC
    OR --> OC
    NS --> UC
    CJ -->|daily fetch| GV
    CJ -->|upsert| SC
```

---

## Component Descriptions

| Component | Layer | Responsibility |
|-----------|-------|---------------|
| `login.jsx` / `register.jsx` | Frontend | Auth UI forms |
| `dashboard.jsx` | Frontend | Displays eligible schemes from eligibility engine |
| `schemes.jsx` | Frontend | Browse and filter all schemes |
| `chatbot.jsx` | Frontend | Chat interface connected to Gemini AI |
| `myschemes.jsx` | Frontend | Application tracker UI |
| `AuthContext` | Frontend | Stores JWT token, user state globally |
| `Axios HTTP Client` | Frontend | Makes all API calls with JWT header |
| `server.js` | Backend | Entry point — starts Express, cron jobs |
| `authMiddleware.js` | Backend | Validates JWT on every protected request |
| `Eligibility Engine` | Backend | Matches user profile against scheme criteria |
| `Chatbot.js` | Backend | Sends messages to Gemini, returns AI responses |
| `node-cron Sync Job` | Backend | Fetches and normalizes data from data.gov.in daily |
| `Notification Service` | Backend | Checks deadlines, creates alerts for users |
| `users` collection | Database | Stores user profiles and credentials |
| `schemes` collection | Database | Stores all government scheme records |
| `opted_schemes` collection | Database | Tracks user applications and statuses |
| `data.gov.in API` | External | Source of government scheme data |
| `Google Gemini API` | External | Powers AI chatbot and recommendations |
