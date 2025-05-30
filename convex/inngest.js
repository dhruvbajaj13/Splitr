import { query } from "./_generated/server";
import { v } from "convex/values";

// 1‑to‑1 debts netted against cases where the user
// was the payer and against settlements already made.
export const getUsersWithOutstandingDebts = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const result = [];

    // Load every 1‑to‑1 expense once (groupId === undefined)
    const expenses = await ctx.db
      .query("expenses")
      .filter((q) => q.eq(q.field("groupId"), undefined))
      .collect();

    // Load every 1‑to‑1 settlement once (groupId === undefined)
    const settlements = await ctx.db
      .query("settlements")
      .filter((q) => q.eq(q.field("groupId"), undefined))
      .collect();

    /* small cache so we don’t hit the DB for every name */
    const userCache = new Map();
    const getUser = async (id) => {
      if (!userCache.has(id)) userCache.set(id, await ctx.db.get(id));
      return userCache.get(id);
    };

    for (const user of users) {
      // Map<counterpartyId, { amount: number, since: number }>
      // +amount => user owes counterparty
      // -amount => counterparty owes user
      const ledger = new Map();

      /* ── 1) process every 1‑to‑1 expense ─────────────────────────────── */
      for (const exp of expenses) {
        // Case A: somebody else paid, and user appears in splits
        if (exp.paidByUserId !== user._id) {
          const split = exp.splits.find(
            (s) => s.userId === user._id && !s.paid
          );
          if (!split) continue;

          const entry = ledger.get(exp.paidByUserId) ?? {
            amount: 0,
            since: exp.date,
          };
          entry.amount += split.amount; // user owes
          entry.since = Math.min(entry.since, exp.date);
          ledger.set(exp.paidByUserId, entry);
        }

        // Case B: user paid, others appear in splits
        else {
          for (const s of exp.splits) {
            if (s.userId === user._id || s.paid) continue;

            const entry = ledger.get(s.userId) ?? {
              amount: 0,
              since: exp.date, // will be ignored while amount ≤ 0
            };
            entry.amount -= s.amount; // others owe user
            ledger.set(s.userId, entry);
          }
        }
      }

      /* ── 2) apply settlements the user PAID or RECEIVED ─────────────── */
      for (const st of settlements) {
        // User paid someone → reduce positive amount owed to that someone
        if (st.paidByUserId === user._id) {
          const entry = ledger.get(st.receivedByUserId);
          if (entry) {
            entry.amount -= st.amount;
            if (entry.amount === 0) ledger.delete(st.receivedByUserId);
            else ledger.set(st.receivedByUserId, entry);
          }
        }
        // Someone paid the user → reduce negative balance (they owed user)
        else if (st.receivedByUserId === user._id) {
          const entry = ledger.get(st.paidByUserId);
          if (entry) {
            entry.amount += st.amount; // entry.amount is negative
            if (entry.amount === 0) ledger.delete(st.paidByUserId);
            else ledger.set(st.paidByUserId, entry);
          }
        }
      }

      /* ── 3) build debts[] list with only POSITIVE balances ──────────── */
      const debts = [];
      for (const [counterId, { amount, since }] of ledger) {
        if (amount > 0) {
          const counter = await getUser(counterId);
          debts.push({
            userId: counterId,
            name: counter?.name ?? "Unknown",
            amount,
            since,
          });
        }
      }

      console.log(user.name, debts);

      if (debts.length) {
        result.push({
          _id: user._id,
          name: user.name,
          email: user.email,
          debts,
        });
      }
    }

    return result;
  },
});

// Get users with expenses for AI insights
export const getUsersWithExpenses = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const result = [];

    // Get current month start
    const now = new Date();
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);
    const monthStart = oneMonthAgo.getTime();

    for (const user of users) {
      // First, check expenses where this user is the payer
      const paidExpenses = await ctx.db
        .query("expenses")
        .withIndex("by_date", (q) => q.gte("date", monthStart))
        .filter((q) => q.eq(q.field("paidByUserId"), user._id))
        .collect();

      // Then, check all expenses to find ones where user is in splits
      // We need to do this separately because we can't filter directly on array contents
      const allRecentExpenses = await ctx.db
        .query("expenses")
        .withIndex("by_date", (q) => q.gte("date", monthStart))
        .collect();

      const splitExpenses = allRecentExpenses.filter((expense) =>
        expense.splits.some((split) => split.userId === user._id)
      );

      // Combine both sets of expenses
      const userExpenses = [...new Set([...paidExpenses, ...splitExpenses])];

      if (userExpenses.length > 0) {
        result.push({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      }
    }

    return result;
  },
});

// Get a specific user's expenses for the past month
export const getUserMonthlyExpenses = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // Get current month start
    const now = new Date();
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);
    const monthStart = oneMonthAgo.getTime();

    // Get all expenses involving this user from the past month
    const allExpenses = await ctx.db
      .query("expenses")
      .withIndex("by_date", (q) => q.gte("date", monthStart))
      .collect();

    // Filter for expenses where this user is involved
    const userExpenses = allExpenses.filter((expense) => {
      const isInvolved =
        expense.paidByUserId === args.userId ||
        expense.splits.some((split) => split.userId === args.userId);
      return isInvolved;
    });

    // Format expenses for AI analysis
    return userExpenses.map((expense) => {
      // Get the user's share of this expense
      const userSplit = expense.splits.find(
        (split) => split.userId === args.userId
      );

      return {
        description: expense.description,
        category: expense.category,
        date: expense.date,
        amount: userSplit ? userSplit.amount : 0,
        isPayer: expense.paidByUserId === args.userId,
        isGroup: expense.groupId !== undefined,
      };
    });
  },
});
