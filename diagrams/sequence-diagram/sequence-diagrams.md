# Yojanta — Sequence Diagrams

---

## 1. User Registration Flow

```mermaid
sequenceDiagram
    actor User
    participant React as React Frontend
    participant Express as Express API
    participant BCrypt as bcrypt
    participant MongoDB

    User->>React: Fill register form (name, email, password)
    React->>Express: POST /api/auth/register
    Express->>MongoDB: Check if email already exists
    MongoDB-->>Express: Not found (OK to proceed)
    Express->>BCrypt: Hash password (10 salt rounds)
    BCrypt-->>Express: Hashed password
    Express->>MongoDB: Save new user document
    MongoDB-->>Express: User saved successfully
    Express->>Express: Generate JWT token
    Express-->>React: 201 Created + JWT token + user object
    React->>React: Store token in AuthContext
    React-->>User: Redirect to Dashboard
```

---

## 2. User Login Flow

```mermaid
sequenceDiagram
    actor User
    participant React as React Frontend
    participant Express as Express API
    participant BCrypt as bcrypt
    participant MongoDB

    User->>React: Enter email and password
    React->>Express: POST /api/auth/login
    Express->>MongoDB: Find user by email
    MongoDB-->>Express: Return user document
    Express->>BCrypt: Compare entered password with hash
    BCrypt-->>Express: Match result (true/false)

    alt Password matches
        Express->>Express: Generate JWT token (24h expiry)
        Express-->>React: 200 OK + JWT token + user object
        React->>React: Store token in AuthContext
        React-->>User: Redirect to Dashboard
    else Password wrong
        Express-->>React: 401 Unauthorized
        React-->>User: Show error message
    end
```

---

## 3. Eligibility Matching Flow

```mermaid
sequenceDiagram
    actor User
    participant React as React Frontend
    participant Auth as JWT Middleware
    participant Express as Express API
    participant MongoDB

    User->>React: Open Dashboard
    React->>Express: GET /api/eligibility (Bearer token)
    Express->>Auth: Verify JWT token
    Auth-->>Express: Token valid → user_id extracted

    Express->>MongoDB: Find user profile by user_id
    MongoDB-->>Express: Return user (age, income, gender, category)

    Express->>Express: Calculate current age from dob

    Express->>MongoDB: Query schemes WHERE
    Note over Express,MongoDB: min_age ≤ userAge ≤ max_age<br/>min_income ≤ userIncome ≤ max_income<br/>gender = userGender OR "All"<br/>category matches OR open<br/>deadline > today

    MongoDB-->>Express: Return matched schemes list
    Express->>MongoDB: Get user's opted_scheme IDs
    MongoDB-->>Express: Return opted scheme IDs
    Express->>Express: Mark already-opted schemes
    Express-->>React: 200 OK + eligible schemes list
    React-->>User: Display personalised dashboard
```

---

## 4. Daily Data Sync Flow (Cron Job)

```mermaid
sequenceDiagram
    participant Cron as node-cron
    participant Job as syncSchemes.js
    participant GovAPI as data.gov.in API
    participant Normalizer as Normalizer
    participant MongoDB

    Cron->>Job: Trigger at midnight (0 0 * * *)
    Job->>GovAPI: GET /resource?api-key=KEY
    GovAPI-->>Job: Raw JSON (varied schema)

    loop For each scheme record
        Job->>Normalizer: Map fields to Scheme schema
        Normalizer-->>Job: Normalized scheme object
        Job->>MongoDB: Find by source_id
        MongoDB-->>Job: Exists? (yes/no)

        alt Scheme exists
            Job->>MongoDB: Update existing document
        else New scheme
            Job->>MongoDB: Insert new document
        end
    end

    Job->>Job: Log results (added, updated, errors)
    Job->>MongoDB: Find users newly eligible for added schemes
    MongoDB-->>Job: User list
    Job->>MongoDB: Create notification documents
```

---

## 5. Opt Into a Scheme Flow

```mermaid
sequenceDiagram
    actor User
    participant React as React Frontend
    participant Auth as JWT Middleware
    participant Express as Express API
    participant MongoDB

    User->>React: Click "Opt In" on a scheme card
    React->>Express: POST /api/opted { scheme_id }
    Express->>Auth: Verify JWT token
    Auth-->>Express: Valid → user_id

    Express->>MongoDB: Check if user already opted (user_id + scheme_id)
    MongoDB-->>Express: Not found (OK)

    Express->>MongoDB: Insert opted_scheme { user_id, scheme_id, status: "opted" }
    MongoDB-->>Express: Saved successfully
    Express-->>React: 201 Created + opted_scheme object
    React-->>User: Show success + update tracker
```
