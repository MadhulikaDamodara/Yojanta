# 🔒 Security Policy — Yojanta

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x (current) | ✅ Active support |

---

## Reporting a Vulnerability

If you discover a security vulnerability in Yojanta, please report it responsibly.

**Do NOT open a public GitHub issue for security vulnerabilities.**

Instead:
1. Open a **private** GitHub Security Advisory:
   - Go to the repo → **Security** tab → **"Report a vulnerability"**
2. Or email the maintainer directly via GitHub profile

**Please include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

**Response time:** Within 48 hours for acknowledgement, fix within 7 days for critical issues.

---

## Security Measures Implemented

### Authentication
- JWT (JSON Web Token) based stateless authentication
- Tokens expire after 24 hours — short window limits exposure
- Tokens signed with a strong secret key stored in environment variables
- No tokens stored server-side — fully stateless

### Password Security
- All passwords hashed using **bcrypt** with 10 salt rounds before storage
- Plain text passwords are never stored or logged
- Passwords are stripped from all API responses

### API Security
- All protected routes require a valid JWT via `Authorization: Bearer <token>` header
- `authMiddleware.js` validates token signature and expiry on every request
- Role-based access: admin-only routes reject regular user tokens with `403 Forbidden`

### Database Security
- **Mongoose ODM** sanitizes all database queries — prevents NoSQL injection
- Sensitive fields (`password`) use `select: false` — excluded from query results by default
- No raw MongoDB queries used anywhere in the codebase

### Environment Security
- All secrets stored in `.env` files
- `.env` listed in `.gitignore` — never committed to version control
- `.env.example` provided with placeholder values only — safe to commit
- Separate environment configs for development and production

### CORS Policy
- CORS configured to allow requests only from the whitelisted frontend origin (`FRONTEND_URL`)
- All other origins rejected

### Input Validation
- All request bodies validated before processing
- Invalid or missing fields return `400 Bad Request` with descriptive error messages

### HTTPS
- Production deployment on Render and Vercel enforces HTTPS by default
- All data in transit encrypted via TLS

---

## Known Limitations (Future Improvements)

| Issue | Status | Plan |
|-------|--------|------|
| No email verification on registration | Open | Add in v1.1 |
| No rate limiting on auth routes | Open | Add express-rate-limit in v1.1 |
| No refresh token mechanism | Open | Implement in v1.2 |
| No 2FA support | Open | Consider in v2.0 |
| Password reset flow missing | Open | Add in v1.1 |

---

## Security Best Practices for Contributors

If you are contributing to Yojanta:

- Never commit `.env` files or API keys
- Never log sensitive data (passwords, tokens, API keys) to console
- Use parameterized queries — never string-concatenate user input into queries
- Validate and sanitize all user inputs before processing
- Use `https` for all external API calls in production
- Keep dependencies updated — run `npm audit` regularly

---

## Dependency Auditing

Run regularly to check for known vulnerabilities:

```bash
# Backend
cd backend && npm audit

# Frontend
cd frontend && npm audit

# Fix automatically where safe
npm audit fix
```

---

*For API documentation see [docs/API.md](./docs/API.md)*
*For contribution guidelines see [CONTRIBUTING.md](./CONTRIBUTING.md)*
