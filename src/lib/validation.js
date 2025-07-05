import { z } from "zod";
import { CATEGORIES } from "./categories.js";

// Negative = expense, positive = income
export const transactionSchema = z.object({
  amount: z.number().min(-1_000_000).max(1_000_000),
  date: z.string().refine((d) => !Number.isNaN(Date.parse(d)), {
    message: "Invalid date",
  }),
  description: z.string().max(100).optional(),
  category: z.enum(CATEGORIES), // unused in Stage-1
});


export const budgetSchema = z.object({
  month: z
    .string()
    .regex(/^\d{4}-\d{2}$/, "Invalid month (YYYY-MM)"),
  category: z.enum(CATEGORIES),
  amount: z.number().min(0).max(1_000_000),
});