# Changelog

All notable changes to Yojanta will be documented in this file.

---

## [1.0.0] - 2026-06-25

### Added
- User registration and login with JWT authentication
- bcrypt password hashing for secure credential storage
- User profile builder (age, income, gender, occupation, state, category)
- Centralized MongoDB scheme database
- Rule-based eligibility engine with multi-criteria matching
- Personalized dashboard showing eligible government schemes
- Scheme search with category and deadline filters
- Application tracker with status lifecycle (opted → applied → approved/rejected)
- Automated daily data sync from data.gov.in API via node-cron
- Admin routes for scheme management (add, update, archive)
- Notification system for deadline reminders
- Responsive React.js frontend
- RESTful Express.js API with role-based access control
- Complete REST API: /auth, /users, /schemes, /eligibility, /opted

### Initial Release
- Full MERN stack application deployed
- README, CONTRIBUTING, ARCHITECTURE, API documentation added
