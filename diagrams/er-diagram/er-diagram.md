# Yojanta — Entity Relationship Diagram

```mermaid
erDiagram
    USERS {
        ObjectId _id PK
        String user_name UK
        String email UK
        String password
        String name
        Date dob
        String gender
        Number income
        String occupation
        String state
        String category
        Date created_at
    }

    SCHEMES {
        ObjectId _id PK
        String scheme_name
        String category
        String department
        Number min_income
        Number max_income
        Number min_age
        Number max_age
        Date deadline
        Array documents
        String gender
        String source_id
        Date last_synced
    }

    OPTED_SCHEMES {
        ObjectId _id PK
        ObjectId user_id FK
        ObjectId scheme_id FK
        Date applied_date
        String status
    }

    USERS ||--o{ OPTED_SCHEMES : "opts into"
    SCHEMES ||--o{ OPTED_SCHEMES : "opted by"
```

## Relationships Explained

| Relationship | Type | Description |
|---|---|---|
| USERS → OPTED_SCHEMES | One to Many | One user can opt into multiple schemes |
| SCHEMES → OPTED_SCHEMES | One to Many | One scheme can be opted into by multiple users |
| OPTED_SCHEMES | Junction | Links users and schemes with status tracking |

## Field Notes

| Field | Note |
|---|---|
| `password` | bcrypt hashed — never stored as plaintext |
| `source_id` | Original ID from data.gov.in — used for daily upsert sync |
| `status` | Enum: opted → applied → approved / rejected |
| `dob` | Date of Birth — used to calculate age at query time |
| `gender` in schemes | "All" means any gender is eligible |
