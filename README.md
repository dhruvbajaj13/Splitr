<h1 align="center">🤖💸Splitr - AI Expense Splitting Platform</h1>

# *📌Overview*

Splitr is a smart, AI-powered expense-splitting app built with Next.js, Tailwind CSS, Convex, and Clerk. It transforms the way groups manage shared costs by enabling  real-time balance tracking, and intelligent suggestions — all enhanced by Gemini AI. Whether you're splitting bills or managing trip expenses, Splitr ensures fairness, and clarity.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

% **Features**

* **💸 Add & Split Expenses** – Quickly add expenses and split them evenly or unevenly among group members.
* **👥 Group Management** – Create groups for trips, roommates, or events and manage shared bills effortlessly.
* **🔐 Secure Authentication** – User sign-up and login powered by **Clerk** for a seamless and secure experience.
* **⚡ Real-time Sync** – Powered by **Convex**, all updates reflect instantly across all users' devices.
* **🎨 Responsive UI** – Clean and modern interface built with **React.js**, **Tailwind CSS** and **Shadcn UI**.
* **📊 Expense Summary** – View clear, auto-updated balances for who owes whom.
* **🔄 Settle Up** – Track settlements and reset group balances after payments.

# **🛠Tech Stack**

* **Frontend:** Next.js, Javascript, Tailwind CSS, ShadCN UI
* **Backend:** Convex 
* **Authentication:** Clerk
* **Workflow Automation:** Inngest
* **AI Integration:** Gemini AI

# **🏗 Local Development**

***Prerequisites***
- Node.js ≥ 18
- npm or yarn
- Convex CLI `npm install -g convex`

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**🚀Demo**

* **[Live Demo](https://splitr-q9gg.vercel.app/):** Check out the live version of Splitr to see its features in action.

# **Getting Started**

1. **Clone the repository**

```bash
git clone https://github.com/your-username/splitr.git
cd splitr
```

2. **Install dependencies**

```bash
npm install
```

3.  **Set up environment variables**

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

4. **Run the development server**

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

**🤝Contributing**

We welcome contributions from the community!
Please read our Contributing Guidelines before you start.

**🌟Acknowledgments**

* **[Clerk](https://clerk.com)** for authentication
* **[Convex](https://convex.dev)** for backend services
* **[ShadCN](https://ui.shadcn.com)** for UI components
* **[Tailwind CSS](https://tailwindcss.com)** for styling
* **[Inngest](https://inngest.com)** for workflow automation

**🤝 Contributing**

We love contributions from the community! Whether it's a bug report, a new feature, or a documentation improvement, we appreciate your help.

***How to Contribute***

1.  **Fork the repository** and create a new branch for your changes.
2.  **Make your changes** and ensure everything is working as expected.
3.  **Submit a pull request** with a clear description of your changes.

# **📄 License**

This project is licensed under the MIT License - see the [`License`](https://github.com/dhruvbajaj13/Splitr/blob/main/LICENSE) file for details.

> A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

# ***Permissions***

* Commercial use
* Modification
* Distribution
* Private use

***Limitations***

* Liability
* Warranty


> Ready to show off your coding achievements? Get started with **Splitr** today! 🚀
