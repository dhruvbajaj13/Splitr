import { Inngest } from "inngest";
import { Resend } from "resend";

// Initialize the Inngest client
export const inngest = new Inngest({
  id: "splitr",
  name: "Splitr",
});

export const resend = new Resend(process.env.RESEND_API_KEY);
