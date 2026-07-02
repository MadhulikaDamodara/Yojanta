# Yojanta — Deployment Diagram

> Render this file at [mermaid.live](https://mermaid.live) → export as PNG → save as `assets/architecture/deployment-diagram.png`

```mermaid
graph TB
    subgraph User["User Device"]
        BR[Web Browser]
    end

    subgraph Vercel["Vercel — CDN + Hosting"]
        FE["React.js Build\nStatic Files\nyojanta.vercel.app"]
    end

    subgraph Render["Render — Cloud Server"]
        BE["Node.js + Express\nREST API\nyojanta-backend.onrender.com"]
        CJ["node-cron\nBackground Job"]
    end

    subgraph Atlas["MongoDB Atlas — Cloud DB"]
        DB[("MongoDB\nCluster\nyojanta database")]
    end

    subgraph GovAPI["Government of India"]
        DGI["data.gov.in\nOpen Data API"]
    end

    subgraph Google["Google Cloud"]
        GEM["Gemini API\nAI Service"]
    end

    BR -->|HTTPS| FE
    FE -->|HTTPS REST API + JWT| BE
    BE -->|Mongoose ODM\nTLS encrypted| DB
    CJ -->|Daily HTTPS GET| DGI
    DGI -->|JSON response| CJ
    CJ -->|Upsert| DB
    BE -->|HTTPS API call| GEM
    GEM -->|AI response| BE
    BE -->|JSON| FE
```

---

## Infrastructure Notes

| Component | Platform | URL | Notes |
|-----------|----------|-----|-------|
| Frontend | Vercel | `https://yojanta.vercel.app` | Auto-deploys on git push to main |
| Backend | Render | `https://yojanta-backend.onrender.com` | Free tier spins down after 15min inactivity |
| Database | MongoDB Atlas | M0 Free Cluster | 512MB storage, shared cluster |
| AI | Google Gemini | API endpoint | Pay-per-use, generous free tier |
| Govt Data | data.gov.in | Open API | Free, requires API key |

## CI/CD Flow

```
Developer pushes to GitHub main branch
              │
     ┌────────┴────────┐
     ▼                 ▼
Vercel auto-builds   Render auto-builds
React frontend       Node.js backend
     │                 │
     ▼                 ▼
Deploy to CDN      Deploy to server
~2 min             ~3 min
```
