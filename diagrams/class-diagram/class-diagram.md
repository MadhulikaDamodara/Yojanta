# Yojanta — Class Diagram

> Render this file at [mermaid.live](https://mermaid.live) → export as PNG → save as `assets/architecture/class-diagram.png`

```mermaid
classDiagram
    class User {
        +ObjectId _id
        +String user_name
        +String email
        +String password
        +String name
        +Date dob
        +String gender
        +Number income
        +String occupation
        +String state
        +String category
        +Date created_at
        +register()
        +login()
        +updateProfile()
        +getProfile()
    }

    class Scheme {
        +ObjectId _id
        +String scheme_name
        +String category
        +String department
        +Number min_income
        +Number max_income
        +Number min_age
        +Number max_age
        +Date deadline
        +Array documents
        +String gender
        +String source_id
        +Date last_synced
        +getAll()
        +getById()
        +create()
        +update()
        +archive()
    }

    class OptedScheme {
        +ObjectId _id
        +ObjectId user_id
        +ObjectId scheme_id
        +Date applied_date
        +String status
        +optIn()
        +updateStatus()
        +getByUser()
    }

    class EligibilityEngine {
        +matchSchemes(user)
        +calculateAge(dob)
        +buildQuery(userProfile)
        +filterByAge(schemes, age)
        +filterByIncome(schemes, income)
        +filterByGender(schemes, gender)
        +filterByCategory(schemes, category)
        +filterByDeadline(schemes)
    }

    class AuthService {
        +register(userData)
        +login(email, password)
        +hashPassword(password)
        +comparePassword(plain, hash)
        +generateToken(userId)
        +verifyToken(token)
    }

    class SyncJob {
        +schedule String
        +run()
        +fetchFromGovAPI()
        +normalizeData(rawData)
        +upsertSchemes(schemes)
        +logResults(added, updated, errors)
    }

    class NotificationService {
        +checkDeadlines()
        +createAlert(userId, schemeId)
        +getByUser(userId)
        +markRead(notificationId)
    }

    class ChatbotService {
        +sendMessage(userMessage, context)
        +buildPrompt(message, userProfile)
        +callGeminiAPI(prompt)
        +parseResponse(response)
    }

    User "1" --> "many" OptedScheme : opts into
    Scheme "1" --> "many" OptedScheme : opted by
    EligibilityEngine --> User : reads profile
    EligibilityEngine --> Scheme : queries
    AuthService --> User : manages
    SyncJob --> Scheme : upserts
    NotificationService --> User : alerts
    NotificationService --> OptedScheme : monitors
    ChatbotService --> User : personalises with
```

---

## Class Descriptions

| Class | Type | Description |
|-------|------|-------------|
| `User` | Mongoose Model | Stores citizen profile and auth credentials |
| `Scheme` | Mongoose Model | Government scheme record with eligibility criteria |
| `OptedScheme` | Mongoose Model | Junction — tracks user applications per scheme |
| `EligibilityEngine` | Service Class | Core matching logic — filters schemes against user profile |
| `AuthService` | Service Class | Registration, login, JWT generation and verification |
| `SyncJob` | Background Job | Fetches and normalizes data.gov.in scheme data daily |
| `NotificationService` | Service Class | Generates and retrieves deadline alerts for users |
| `ChatbotService` | Service Class | Handles Gemini API communication for AI chatbot |
