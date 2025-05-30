# Splitr
Splitr is a smart, AI-powered expense-splitting app built with React.js, Tailwind CSS, Convex, and Clerk. It transforms the way groups manage shared costs by enabling  real-time balance tracking, and intelligent suggestions — all enhanced by Gemini AI. Whether you're splitting bills or managing trip expenses, Splitr ensures fairness, and clarity.

# Features
* **💸 Add & Split Expenses** – Quickly add expenses and split them evenly or unevenly among group members.
* **👥 Group Management** – Create groups for trips, roommates, or events and manage shared bills effortlessly.
* **🔐 Secure Authentication** – User sign-up and login powered by **Clerk** for a seamless and secure experience.
* **⚡ Real-time Sync** – Powered by **Convex**, all updates reflect instantly across all users' devices.
* **🎨 Responsive UI** – Clean and modern interface built with **React.js**, **Tailwind CSS** and **Shadcn UI**.
* **📊 Expense Summary** – View clear, auto-updated balances for who owes whom.
* **🔄 Settle Up** – Track settlements and reset group balances after payments.

# Tech Stack
* **Frontend:** Next.js, Javascript, Tailwind CSS
* **Backend:** Convex 
* **Authentication:** Clerk
* **Workflow Automation / Event Handling:** Inngest
* **AI Integration:** Gemini AI

# Getting Started
### 1. **Clone the repository**

```bash
git clone https://github.com/your-username/splitr.git
cd splitr
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Set up environment variables**

Create a `.env` file in the root directory and add the required environment variables:

```env
CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

CLERK_JWT_ISSUER_DOMAIN=

RESEND_API_KEY=

GEMINI_API_KEY=
```

> Replace the values with your actual **Clerk** and **Convex** credentials.

### 4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:3000) in your browser to see the app running.




# Contributing
1. **Fork** this repository
2. **Clone** your forked repo

   ```bash
   git clone https://github.com/your-username/splitr.git
   ```
3. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and **commit**

   ```bash
   git commit -m "Add: Your meaningful commit message"
   ```
5. **Push** to your branch

   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request** – Go to the original repo and submit a PR!

# License
This project, [Splitr](https://github.com/dhruvbajaj13/splitr), is licensed under the MIT License.

A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

### Permissions
* Commercial use
* Modification
* Distribution
* Private use
### Limitations
* Liability
* Warranty
### Conditions
* License and copyright notice

# Acknowleddgments
* **[Clerk](https://clerk.com)** for authentication
* **[Convex](https://convex.dev)** for backend services
* **[ShadCN](https://ui.shadcn.com)** for UI components
* **[Tailwind CSS](https://tailwindcss.com)** for styling
* **[Inngest](https://inngest.com)** for workflow automation








