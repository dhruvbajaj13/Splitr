import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { inngest } from "./client";

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export const paymentReminders = inngest.createFunction(
  { id: "send-payment-reminders" },
  { cron: "0 10 * * *" }, // daily at 10 AM UTC
  async ({ step }) => {
    /* 1. fetch all users that still owe money */
    const users = await step.run("fetch‑debts", () =>
      convex.query(api.inngest.getUsersWithOutstandingDebts)
    );

    /* 2. build & send one e‑mail per user */
    const results = await step.run("send‑emails", async () => {
      return Promise.all(
        users.map(async (u) => {
          const rows = u.debts
            .map(
              (d) => `
                <tr>
                  <td style="padding:4px 8px;">${d.name}</td>
                  <td style="padding:4px 8px;">$${d.amount.toFixed(2)}</td>
                </tr>
              `
            )
            .join("");

          if (!rows) return { userId: u._id, skipped: true };

          const html = `
            <h2>Splitr – Payment Reminder</h2>
            <p>Hi ${u.name}, you have the following outstanding balances:</p>
            <table cellspacing="0" cellpadding="0" border="1" style="border-collapse:collapse;">
              <thead>
                <tr><th>To</th><th>Amount</th></tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
            <p>Please settle up soon. Thanks!</p>
          `;

          try {
            await convex.action(api.email.sendEmail, {
              to: u.email,
              subject: "You have pending payments on Splitr",
              html,
              apiKey: process.env.RESEND_API_KEY,
            });
            return { userId: u._id, success: true };
          } catch (err) {
            return { userId: u._id, success: false, error: err.message };
          }
        })
      );
    });

    return {
      processed: results.length,
      successes: results.filter((r) => r.success).length,
      failures: results.filter((r) => r.success === false).length,
    };
  }
);
