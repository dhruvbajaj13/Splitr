import { Bell, CreditCard,BarChart3, PieChart, Receipt, Users } from "lucide-react";

export const statsData = [
    {
      value: "10K+",
      label: "Active Users",
    },
    {
      value: "₹2M+",
      label: "Transactions Tracked",
    },
    {
      value: "99%",
      label: "Uptime",
    },
    {
      value: "4.8/5",
      label: "User Rating",
    },
];

export const FEATURES = [
  {
    title: "Group Expenses",
    Icon: Users,
    bg: "bg-blue-200",
    color: "text-black",
    description:
      "Create groups for roommates, trips, or events to keep expenses organized.",
  },
  {
    title: "Smart Settlements",
    Icon: CreditCard,
    bg: "bg-blue-200",
    color: "text-black",
    description:
      "Our algorithm minimises the number of payments when settling up.",
  },
  {
    title: "Expense Analytics",
    Icon: PieChart,
    bg: "bg-blue-200",
    color: "text-black",
    description:
      "Track spending patterns and discover insights about your shared costs.",
  },
  {
    title: "Payment Reminders",
    Icon: Bell,
    bg: "bg-amber-100",
    color: "text-amber-600",
    description:
      "Automated reminders for pending debts and insights on spending patterns.",
  },
  {
    title: "Multiple Split Types",
    Icon: Receipt,
    bg: "bg-blue-200",
    color: "text-black",
    description:
      "Split equally, by percentage, or by exact amounts to fit any scenario.",
  },
  {
    title: "Real‑time Updates",
    Icon: () => (
      /* custom inline icon (no Lucide equivalent) */
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 14v8M15 14v8M9 2v6M15 2v6" />
      </svg>
    ),
    bg: "bg-blue-200",
    color: "text-black",
    description:
      "See new expenses and repayments the moment your friends add them.",
  },
];

export const STEPS = [
  {
    icon: <CreditCard className="h-6 w-6 text-blue-600" />,
    title: "1. Create or Join a Group",
    description:
      "Start a group for your roommates, trip, or event and invite friends.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
    title: "2. Add Expenses",
    description:
      "Record who paid and how the bill should be split amongst members.",
  },
  {
    icon: <PieChart className="h-6 w-6 text-blue-600" />,
    title: "3. Settle Up",
    description: "View who owes what and log payments when debts are cleared.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Splitr made our group trips smooth and stress-free. We never argue about money anymore.",
    name: "Dhruv Bajaj",
    image: "/testimonials/picture1.png",
    role: "Founder, PixelForge Studios",
  },
  {
    quote:
      "Managing shared rent and groceries with my flatmates has never been easier. Splitr is must-have.",
    name: "Manish Gupta",
    image: "/testimonials/picture2.jpg",
    role: "Software Engineer at Zolve",
  },
  {
    quote:
      "I use Splitr with my startup team to track office expenses. It's intuitive, fast, and reliable.",
    name: "Yash Banga",
    image: "/testimonials/picture 3.jpg",
    role: "Co-Founder, PixelForge Studios",
  },
];
