Splitr is an AI-powered expense-sharing web app built with Next.js, TypeScript, Tailwind CSS, and Convex.
It simplifies splitting bills between friends, tracking payments, and managing shared expenses with AI-assisted summaries.

2️⃣ Tech Stack & Requirements

Frontend: Next.js 14, TypeScript, Tailwind CSS

Backend: Convex

Auth: Clerk

Payments: Razorpay Integration (Pro Plan)

AI: Gemini API (optional for local dev)


Install Requirements:

Node.js ≥ 18

npm or yarn

Convex CLI installed globally (npm install -g convex)

Clerk test credentials (get from project admin)



---

3️⃣ Getting Started (Setup Instructions)

# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/<your-username>/Splitr.git

# 3. Install dependencies
npm install

# 4. Start Convex
npx convex dev

# 5. Run the app
npm run dev

🔹 Environment Variables (create .env.local):

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
CONVEX_DEPLOYMENT=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
OPENAI_API_KEY=...


---

4️⃣ Contribution Workflow

1. Pick an Issue → Check GitHub Issues with good first issue or help wanted.


2. Discuss Before Coding → Comment under the issue to get assigned.


3. Create a New Branch:

git checkout -b feature/your-feature-name


4. Make Changes & Test Locally


5. Commit:

git commit -m "feat: add expense filtering by category"


6. Push & Open PR:

git push origin feature/your-feature-name


7. PR Review Process → At least 1 approval before merging.




---

5️⃣ Issue Labels

good first issue → Easy, beginner-friendly

help wanted → Needs extra eyes

bug → Something is broken

enhancement → Feature improvements

documentation → README or doc updates



---

6️⃣ Code Style Guidelines

Follow JavaScript strict mode

Prettier for formatting (npm run format)

Descriptive commit messages (Conventional Commits format)

No direct commits to main


7️⃣ Communication

Primary: GitHub Discussions

Secondary: GSSoC Discord

For private queries, contact @dhruvbajaj13 (project admin)


8️⃣ First PR Ideas

Improve README visuals (badges, screenshots)

Add better error handling for Razorpay flow

UI polish (empty state screens, loading spinners)

Create reusable components for buttons, modals

Write utility functions for expense calculations
