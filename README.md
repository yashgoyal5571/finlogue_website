# Finlogue Website

Official web portal for **Finlogue** — finance, strategy, and consulting club. Built with Next.js (App Router), TypeScript, and tailored archival design aesthetics.

---

## ⚡ Quick Start for Developers

For a complete step-by-step guide for new contributors, read the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- Git

### 2. Setup
```bash
# Clone the repository
git clone https://github.com/yashgoyal5571/finlogue_website.git
cd finlogue_website

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to preview the site.

---

## 🌿 Contribution & Approval Workflow

All contributors (juniors and team members) must follow this workflow to ensure code quality:

1. **Pull latest `main`**: `git checkout main && git pull origin main`
2. **Create a branch**: `git checkout -b feature/your-feature-name`
3. **Make changes & test locally**: verify with `npm run lint` and `npm run build`
4. **Push branch**: `git push -u origin feature/your-feature-name`
5. **Open a Pull Request (PR)** on GitHub targeting `main` and tag the project lead for review.
6. **Deploy**: Once approved and merged into `main`, Netlify automatically triggers production deployment.

---

## 🛠️ Available Scripts

- `npm run dev` — Starts the local Next.js development server
- `npm run build` — Builds the application for production
- `npm run start` — Starts the production build locally
- `npm run lint` — Checks for ESLint code quality issues

---

## 📖 Architecture & Design Documentation
- [FINLOGUE-SITE-ARCHITECTURE.md](./FINLOGUE-SITE-ARCHITECTURE.md) — Site layout, page roles, and color system.
- [FINLOGUE-DESIGN.md](./FINLOGUE-DESIGN.md) — Visual principles and typography tokens.
- [docs/GOOGLE_SHEETS_SETUP.md](./docs/GOOGLE_SHEETS_SETUP.md) — Integration guide for Google Sheets webhooks.
