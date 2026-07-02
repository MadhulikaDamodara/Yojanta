# Yojanta — Activity Diagram

> Render this file at [mermaid.live](https://mermaid.live) → export as PNG → save as `assets/architecture/activity-diagram.png`

## Main User Activity Flow

```mermaid
flowchart TD
    A([User visits Yojanta]) --> B{Has account?}
    B -->|No| C[Register with email + password]
    B -->|Yes| D[Login]
    C --> E{Registration valid?}
    E -->|No| F[Show error message]
    F --> C
    E -->|Yes| G[JWT token issued]
    D --> H{Credentials correct?}
    H -->|No| I[Show invalid credentials]
    I --> D
    H -->|Yes| G
    G --> J{Profile complete?}
    J -->|No| K[Go to Profile page]
    K --> L[Fill all profile fields]
    L --> M[Save Profile]
    M --> N[Dashboard]
    J -->|Yes| N
    N --> O[View eligible schemes]
    O --> P{User action?}
    P -->|Search/Filter| Q[Filter schemes list]
    Q --> P
    P -->|View scheme details| R[Open scheme detail page]
    R --> P
    P -->|Opt into scheme| S[POST /api/opted]
    S --> T[Scheme added to Tracker]
    T --> P
    P -->|Open Tracker| U[View application tracker]
    U --> V{Update status?}
    V -->|Yes| W[Select new status]
    W --> X[PUT /api/opted/:id]
    X --> U
    V -->|No| P
    P -->|Open Chatbot| Y[Ask scheme question]
    Y --> Z[Gemini AI responds]
    Z --> P
    P -->|Logout| AA([Session ended])
```

---

## Data Sync Activity (Background — runs daily)

```mermaid
flowchart TD
    A([node-cron triggers at midnight]) --> B[Call data.gov.in API]
    B --> C{API response OK?}
    C -->|No| D[Log error]
    D --> E[Retry after 1 hour]
    E --> B
    C -->|Yes| F[Parse JSON response]
    F --> G[Normalize to Scheme schema]
    G --> H{Scheme exists in DB?}
    H -->|Yes| I[Update existing record]
    H -->|No| J[Insert new record]
    I --> K{More records?}
    J --> K
    K -->|Yes| H
    K -->|No| L[Log sync summary]
    L --> M[Check deadlines within 7 days]
    M --> N{Any upcoming deadlines?}
    N -->|Yes| O[Create notification records]
    N -->|No| P([Sync complete])
    O --> P
```
