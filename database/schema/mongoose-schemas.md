# Yojanta — Database Schema Reference

MongoDB database: `yojanta`  
ODM: Mongoose

---

## Collection: users

```javascript
const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
    // bcrypt hashed — never stored as plaintext
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: Date,
    required: false
    // Used to calculate age for eligibility matching
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: null
  },
  income: {
    type: Number,
    min: 0,
    default: null
    // Annual household income in INR
  },
  occupation: {
    type: String,
    default: null
    // e.g. Student, Farmer, Government Employee
  },
  state: {
    type: String,
    default: null
    // Indian state name for state-specific scheme matching
  },
  category: {
    type: String,
    enum: ['General', 'OBC', 'SC', 'ST'],
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Index
UserSchema.index({ email: 1 }, { unique: true });
```

---

## Collection: schemes

```javascript
const SchemeSchema = new mongoose.Schema({
  scheme_name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
    // e.g. Education, Agriculture, Health, Housing, Women, SC/ST
  },
  department: {
    type: String,
    default: null
    // Ministry or department administering the scheme
  },
  min_income: {
    type: Number,
    default: 0
    // Minimum annual income (INR) — 0 means no lower limit
  },
  max_income: {
    type: Number,
    default: 999999999
    // Maximum annual income (INR) — high default means no upper limit
  },
  min_age: {
    type: Number,
    default: 0
  },
  max_age: {
    type: Number,
    default: 120
  },
  deadline: {
    type: Date,
    default: null
    // Application closing date
  },
  documents: {
    type: [String],
    default: []
    // e.g. ['Aadhar Card', 'Income Certificate', 'Marksheet']
  },
  gender: {
    type: String,
    enum: ['All', 'Male', 'Female'],
    default: 'All'
  },
  source_id: {
    type: String,
    default: null
    // Original record ID from data.gov.in — used for upsert during sync
  },
  last_synced: {
    type: Date,
    default: null
    // Timestamp of last successful data sync from data.gov.in
  }
});

// Indexes
SchemeSchema.index({ category: 1 });
SchemeSchema.index({ deadline: 1 });
SchemeSchema.index({ source_id: 1 });
```

---

## Collection: opted_schemes

```javascript
const OptedSchemeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scheme_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scheme',
    required: true
  },
  applied_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['opted', 'applied', 'approved', 'rejected'],
    default: 'opted'
  }
});

// Indexes
OptedSchemeSchema.index({ user_id: 1 });
OptedSchemeSchema.index({ user_id: 1, scheme_id: 1 }, { unique: true });
// Unique compound index prevents a user from opting into the same scheme twice
```

---

## Relationships

```
users (1) ──────────── (many) opted_schemes
                               │
schemes (1) ───────────────────┘
```

- One user can opt into many schemes
- One scheme can be opted into by many users
- `opted_schemes` is the junction collection

---

## Sample Documents

### users document
```json
{
  "_id": "64abc1234567890abcdef123",
  "user_name": "madhulika123",
  "email": "madhulika@example.com",
  "password": "$2b$10$hashedpasswordhere",
  "name": "Madhulika Damodara",
  "dob": "2002-05-15T00:00:00.000Z",
  "gender": "Female",
  "income": 250000,
  "occupation": "Student",
  "state": "Andhra Pradesh",
  "category": "OBC",
  "created_at": "2026-01-10T08:30:00.000Z"
}
```

### schemes document
```json
{
  "_id": "64xyz7890abcdef123456789",
  "scheme_name": "National Scholarship Portal - Central Sector Scheme",
  "category": "Education",
  "department": "Ministry of Education",
  "min_income": 0,
  "max_income": 800000,
  "min_age": 18,
  "max_age": 25,
  "deadline": "2026-12-31T00:00:00.000Z",
  "documents": ["Aadhar Card", "Income Certificate", "Marksheet"],
  "gender": "All",
  "source_id": "gov_sch_001",
  "last_synced": "2026-06-24T00:00:00.000Z"
}
```

### opted_schemes document
```json
{
  "_id": "64opted123456789abcdef00",
  "user_id": "64abc1234567890abcdef123",
  "scheme_id": "64xyz7890abcdef123456789",
  "applied_date": "2026-06-24T10:30:00.000Z",
  "status": "opted"
}
```
