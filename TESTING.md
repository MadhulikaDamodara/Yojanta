# 🧪 Testing Guide — Yojanta

Manual test cases for all major features of Yojanta. Run these after setup to verify everything works correctly.

---

## Test Environment Setup

Before running tests:
- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`
- MongoDB connected
- Use **Postman** for API tests (import `api/postman-collection/Yojanta.postman_collection.json`)

---

## Module 1 — Authentication

### TC-01: User Registration (Valid)
| Field | Value |
|-------|-------|
| Test ID | TC-01 |
| Module | Auth |
| Priority | High |

**Steps:**
1. Open `http://localhost:3000/register`
2. Enter username: `testuser01`
3. Enter email: `test@example.com`
4. Enter password: `Test@1234`
5. Click **Register**

**Expected Result:**
- User is redirected to Dashboard
- JWT token stored in session
- Success message displayed

**API Equivalent:**
```
POST /api/auth/register
Body: { "user_name": "testuser01", "email": "test@example.com", "password": "Test@1234", "name": "Test User" }
Expected: 201 Created + token
```

---

### TC-02: User Registration (Duplicate Email)
**Steps:**
1. Attempt to register with the same email used in TC-01

**Expected Result:**
- Error message: "Email already registered"
- User stays on registration page
- `400 Bad Request` returned

---

### TC-03: User Login (Valid)
**Steps:**
1. Open `http://localhost:3000/login`
2. Enter email: `test@example.com`
3. Enter password: `Test@1234`
4. Click **Login**

**Expected Result:**
- User redirected to Dashboard
- JWT token issued
- `200 OK` with token in response

---

### TC-04: User Login (Wrong Password)
**Steps:**
1. Enter correct email, wrong password

**Expected Result:**
- Error: "Invalid email or password"
- `401 Unauthorized`
- User stays on login page

---

### TC-05: Access Protected Route Without Token
**Steps:**
1. In Postman, call `GET /api/users/profile` with no Authorization header

**Expected Result:**
- `401 Unauthorized`
- Response: `{ "error": "No token provided" }`

---

## Module 2 — User Profile

### TC-06: Create Profile (Complete)
**Steps:**
1. Login as `test@example.com`
2. Go to **Profile** page
3. Fill all fields:
   - Name: `Ananya Sharma`
   - Date of Birth: `15/05/2002`
   - Gender: `Female`
   - Annual Income: `250000`
   - Occupation: `Student`
   - State: `Andhra Pradesh`
   - Category: `OBC`
4. Click **Save Profile**

**Expected Result:**
- Success message shown
- Profile saved to MongoDB
- Dashboard updates with matched schemes
- `200 OK` from `PUT /api/users/profile`

---

### TC-07: View Profile
**Steps:**
1. Login → Go to Profile page

**Expected Result:**
- All previously saved fields pre-filled
- `200 OK` from `GET /api/users/profile`

---

### TC-08: Update Profile (Change Income)
**Steps:**
1. Change Annual Income from `250000` to `500000`
2. Save

**Expected Result:**
- Profile updated in DB
- Dashboard eligible schemes refresh to reflect new income

---

## Module 3 — Eligibility Engine

### TC-09: Dashboard Shows Eligible Schemes
**Steps:**
1. Login with complete profile (TC-06)
2. Open Dashboard

**Expected Result:**
- At least 1 eligible scheme displayed
- Schemes match profile criteria (age, income, gender, category)
- Expired schemes (past deadline) NOT shown
- `200 OK` from `GET /api/eligibility`

---

### TC-10: Incomplete Profile — No Schemes
**Steps:**
1. Create a new user
2. Do NOT fill profile
3. Open Dashboard

**Expected Result:**
- Message: "Please complete your profile to see eligible schemes"
- No schemes listed

---

### TC-11: Eligibility Filter Accuracy
**Steps:**
1. Note user profile: age=22, income=250000, gender=Female, category=OBC
2. Check one displayed scheme's criteria
3. Verify the user actually meets ALL criteria

**Expected Result:**
- Scheme's `min_age` ≤ 22 ≤ `max_age`
- Scheme's `min_income` ≤ 250000 ≤ `max_income`
- Scheme's `gender` = "Female" OR "All"
- Scheme's `deadline` > today

---

## Module 4 — Scheme Browser

### TC-12: View All Schemes
**Steps:**
1. Go to **Schemes** page

**Expected Result:**
- All schemes displayed
- Each card shows: name, category, deadline, department
- `200 OK` from `GET /api/schemes`

---

### TC-13: Search Schemes by Keyword
**Steps:**
1. Type "scholarship" in the search bar

**Expected Result:**
- Only schemes with "scholarship" in the name shown
- Other schemes hidden

---

### TC-14: Filter by Category
**Steps:**
1. Select category: "Education" from filter dropdown

**Expected Result:**
- Only Education schemes shown
- Count updates correctly

---

### TC-15: View Single Scheme Details
**Steps:**
1. Click on any scheme card

**Expected Result:**
- Full scheme details displayed
- Documents required listed
- Application deadline shown
- `200 OK` from `GET /api/schemes/:id`

---

## Module 5 — Application Tracker

### TC-16: Opt Into a Scheme
**Steps:**
1. On Dashboard, click **"Opt In"** on any eligible scheme

**Expected Result:**
- Success confirmation shown
- Scheme appears in **Tracker** with status `opted`
- `201 Created` from `POST /api/opted`
- Duplicate opt-in attempt → `400 Bad Request`

---

### TC-17: View Application Tracker
**Steps:**
1. Go to **Tracker** page

**Expected Result:**
- All opted schemes listed
- Each entry shows: scheme name, category, opted date, status

---

### TC-18: Update Status to Applied
**Steps:**
1. In Tracker, find opted scheme
2. Change status from `opted` → `applied`

**Expected Result:**
- Status updated in DB
- UI reflects new status immediately
- `200 OK` from `PUT /api/opted/:id`

---

### TC-19: Full Status Lifecycle
**Steps:**
1. Opt into scheme → status: `opted`
2. Update → `applied`
3. Update → `approved`

**Expected Result:**
- Each transition succeeds
- Only valid values accepted (opted, applied, approved, rejected)

---

## Module 6 — AI Chatbot

### TC-20: Chatbot Basic Response
**Steps:**
1. Open Chatbot
2. Type: "What schemes are available for farmers?"

**Expected Result:**
- Relevant response within 5 seconds
- Response mentions agriculture-related schemes
- No error message

---

### TC-21: Chatbot Eligibility Query
**Steps:**
1. Type: "Am I eligible for PM Kisan?"

**Expected Result:**
- Chatbot references user profile
- Gives relevant eligibility guidance

---

## Module 7 — Admin Routes

### TC-22: Add Scheme (Admin)
**Steps:**
1. Login as admin user
2. `POST /api/schemes` with valid scheme body

**Expected Result:**
- `201 Created`
- New scheme appears in scheme list

---

### TC-23: Non-Admin Cannot Add Scheme
**Steps:**
1. Login as regular user
2. Call `POST /api/schemes`

**Expected Result:**
- `403 Forbidden`
- Scheme NOT added

---

## Module 8 — Data Sync (Cron Job)

### TC-24: Manual Sync Trigger
**Steps:**
1. Call the sync endpoint (if exposed) OR wait for scheduled midnight trigger
2. Check backend logs

**Expected Result:**
- Logs show: records added, updated, errors (if any)
- No unhandled crash
- MongoDB scheme count updated

---

## Test Results Tracker

| Test ID | Description | Status | Notes |
|---------|-------------|--------|-------|
| TC-01 | Registration valid | ⬜ | |
| TC-02 | Registration duplicate | ⬜ | |
| TC-03 | Login valid | ⬜ | |
| TC-04 | Login wrong password | ⬜ | |
| TC-05 | Protected route no token | ⬜ | |
| TC-06 | Create complete profile | ⬜ | |
| TC-07 | View profile | ⬜ | |
| TC-08 | Update profile | ⬜ | |
| TC-09 | Dashboard eligible schemes | ⬜ | |
| TC-10 | Incomplete profile | ⬜ | |
| TC-11 | Eligibility filter accuracy | ⬜ | |
| TC-12 | View all schemes | ⬜ | |
| TC-13 | Search schemes | ⬜ | |
| TC-14 | Filter by category | ⬜ | |
| TC-15 | Single scheme details | ⬜ | |
| TC-16 | Opt into scheme | ⬜ | |
| TC-17 | View tracker | ⬜ | |
| TC-18 | Update to applied | ⬜ | |
| TC-19 | Full status lifecycle | ⬜ | |
| TC-20 | Chatbot basic | ⬜ | |
| TC-21 | Chatbot eligibility | ⬜ | |
| TC-22 | Admin add scheme | ⬜ | |
| TC-23 | Non-admin blocked | ⬜ | |
| TC-24 | Data sync | ⬜ | |

**Status key:** ✅ Pass &nbsp; ❌ Fail &nbsp; ⬜ Not tested &nbsp; ⚠️ Partial

---

*For API details see [docs/API.md](./docs/API.md)*
*For setup see [INSTALLATION.md](./INSTALLATION.md)*
