# Contributing to Finlogue Website

Welcome to the **Finlogue Website** codebase! This guide is for team members and contributors to set up their local environment, make changes safely, and submit updates for review.

---

## 🛠️ 1. Prerequisites

Before setting up, make sure you have the following installed on your machine:
- **Node.js** (v20.x or higher recommended): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **Code Editor**: [VS Code](https://code.visualstudio.com/) (recommended)

Check your installations in your terminal:
```bash
node -v   # Should output v20.x or higher
npm -v    # Should output v10.x or higher
git --version
```

---

## 🚀 2. Local Environment Setup

### Step 1: Clone the Repository
Open your terminal (PowerShell, Bash, or Command Prompt) and run:
```bash
git clone https://github.com/yashgoyal5571/finlogue_website.git
cd finlogue_website
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create your local environment file by copying the template:
- **Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env.local
  ```
- **macOS / Linux / Git Bash:**
  ```bash
  cp .env.example .env.local
  ```

Open `.env.local` in your editor. For local UI development, default placeholder values are usually sufficient. If you need live Google Sheets webhook testing, request the active script URL and credentials from the project lead.

### Step 4: Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. Any edits in `app/` or `components/` will automatically hot-reload.

---

## 🌿 3. Development & Contribution Workflow

> **⚠️ Rule:** Never commit directly to the `main` branch. All work must happen on a feature branch and go through a Pull Request (PR).

### Step 1: Sync with the Latest Code
Before starting any new work:
```bash
git checkout main
git pull origin main
```

### Step 2: Create a Feature Branch
Create and switch to a descriptive branch name:
```bash
# Format: feature/<feature-name> or fix/<bug-name>
git checkout -b feature/update-events-section
```

### Step 3: Make Your Changes & Test
- Modify the necessary code and components.
- Check the results in your browser at `http://localhost:3000`.
- Verify there are no linting or build errors:
  ```bash
  npm run lint
  npm run build
  ```
  *(Both commands must pass cleanly before submitting your PR!)*

### Step 4: Commit Your Changes
Stage and commit your changes with clear messages:
```bash
git status
git add .
git commit -m "feat(events): update speaker lineup and agenda details"
```

### Step 5: Push Branch to GitHub
```bash
git push -u origin feature/update-events-section
```

---

## 🔍 4. Submitting for Approval (Pull Request)

1. Go to the repository on GitHub: [github.com/yashgoyal5571/finlogue_website](https://github.com/yashgoyal5571/finlogue_website)
2. You will see a banner saying **"Compare & pull request"** for your branch. Click it.
3. Fill in the PR details:
   - **Title**: Short summary of what was done.
   - **Description**: What changes were made, why, and any screenshots if UI changes were introduced.
4. Set the **Reviewer** to the project lead (`yashgoyal5571`).
5. Click **Create pull request**.

### Step 5: Review & Deployment
- The project lead will review the changes and provide feedback or approve.
- Once approved and merged into `main`, Netlify will automatically build and deploy the changes to the live site.

---

## 📁 5. Repository Structure Overview

```
finlogue_website/
├── app/                  # Next.js App Router pages and layouts
│   ├── page.tsx          # Homepage
│   ├── events/           # Events page
│   └── team/             # Team & Contact page
├── components/           # Reusable UI components (Navbar, Footer, Cards, etc.)
├── content/              # Editorial data, articles, case files
├── data/                 # Static data & configuration
├── docs/                 # Documentation (e.g. Google Sheets webhook setup)
├── lib/                  # Helper utilities and shared libraries
├── public/               # Static assets (images, fonts, icons)
├── .env.example          # Template for required environment variables
└── netlify.toml          # Netlify build and deployment configuration
```

---

## ❓ Need Help?
If you encounter any issues during setup or development, please open an issue or reach out to the project lead before pushing changes.
