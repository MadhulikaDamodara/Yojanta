# 🤝 Contributing to Yojanta

Thank you for your interest in contributing to Yojanta! This document explains how to get started, what to work on, and how to submit your changes.

---

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Branching Strategy](#branching-strategy)
- [Commit Message Format](#commit-message-format)
- [Pull Request Process](#pull-request-process)
- [What Not to Do](#what-not-to-do)

---

## 🤝 Code of Conduct

- Be respectful and constructive in all interactions
- Focus feedback on code, not people
- Welcome contributors of all experience levels

---

## 💡 Ways to Contribute

| Type | Examples |
|------|---------|
| 🐛 Bug Fix | Fix a broken API response, UI glitch, login error |
| ✨ New Feature | Add multilingual support, email notifications |
| 📝 Documentation | Improve README, add code comments, fix typos |
| 🎨 UI Improvement | Better styling, mobile responsiveness |
| ⚡ Performance | Optimize DB queries, reduce API response time |
| 🧪 Tests | Add unit tests for eligibility engine or API routes |

---

## 🚀 Getting Started

### 1. Fork the Repository
Click the **Fork** button at the top right of the GitHub page.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/Yojanta.git
cd Yojanta
```

### 3. Set Up the Project
Follow the installation steps in [README.md](./README.md):
```bash
# Backend
cd backend
npm install
cp ../.env.example .env      # fill in your values

# Frontend
cd ../frontend
npm install
```

### 4. Add Upstream Remote
```bash
git remote add upstream https://github.com/MadhulikaDamodara/Yojanta.git
```

### 5. Verify Setup
```bash
# Backend should start on port 5000
cd backend && npm run dev

# Frontend should start on port 3000
cd frontend && npm start
```

---

## 🌿 Branching Strategy

Always create a new branch for your work. **Never commit directly to `main`.**

```bash
# Sync with latest main first
git checkout main
git pull upstream main

# Create your feature branch
git checkout -b type/short-description
```

**Branch naming format:**

| Type | Format | Example |
|------|--------|---------|
| New feature | `feature/description` | `feature/email-notifications` |
| Bug fix | `fix/description` | `fix/eligibility-income-filter` |
| Documentation | `docs/description` | `docs/api-reference` |
| UI change | `ui/description` | `ui/mobile-dashboard` |
| Performance | `perf/description` | `perf/scheme-query-index` |

---

## ✍️ Commit Message Format

Use clear, descriptive commit messages:

```
type: short description (max 60 chars)

Optional longer explanation if needed.
```

**Types:**
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `style:` — formatting, no logic change
- `refactor:` — code restructure, no behavior change
- `perf:` — performance improvement
- `test:` — adding or fixing tests

**Examples:**
```bash
feat: add deadline notification for opted schemes
fix: eligibility engine not filtering by category correctly
docs: add Postman collection for API testing
style: format backend route files consistently
perf: add compound index on opted_schemes collection
```

---

## 🔁 Pull Request Process

### 1. Push Your Branch
```bash
git add .
git commit -m "feat: your change description"
git push origin your-branch-name
```

### 2. Open a Pull Request
- Go to your fork on GitHub
- Click **"Compare & pull request"**
- Set base repository: `MadhulikaDamodara/Yojanta` | base: `main`

### 3. Fill in the PR Template

**Title:** `type: short description`

**Description should include:**
```
## What does this PR do?
Brief description of the change.

## Why is this change needed?
What problem does it solve?

## How to test?
Steps to verify the change works correctly.

## Screenshots (if UI change)
Before and after screenshots.

## Checklist
- [ ] I tested my changes locally
- [ ] I have not committed any .env or secret files
- [ ] My code follows the existing style
- [ ] I updated documentation if needed
```

### 4. Wait for Review
- The maintainer will review and may request changes
- Make requested changes on the same branch — the PR updates automatically
- Once approved, it will be merged

---

## 🚫 What Not to Do

- ❌ Do not commit `.env` files — they contain secrets
- ❌ Do not commit `node_modules/`
- ❌ Do not push directly to `main`
- ❌ Do not add `desktop.ini`, `.DS_Store`, or other system files
- ❌ Do not change unrelated files in your PR
- ❌ Do not copy-paste code without understanding it

---

## 🐛 Reporting Bugs

Open an issue on GitHub with:

1. **Title:** Clear one-line description of the bug
2. **Steps to reproduce:** Numbered list of exact steps
3. **Expected behavior:** What should happen
4. **Actual behavior:** What actually happens
5. **Environment:** OS, Node.js version, browser

---

## 💬 Questions?

Open a GitHub Issue with the label `question` and describe what you need help with.

---

*Thank you for helping make Yojanta better for Indian citizens!* 🇮🇳
