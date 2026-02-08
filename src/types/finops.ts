export type TransactionStatus = "pending" | "completed" | "failed";

export type Transaction = {
  id: string;
  date: string; // ISO date string, e.g. 2026-02-08
  merchant: string;
  category: "Cloud" | "SaaS" | "Payments" | "Other";
  amount: number; // positive number in USD
  status: TransactionStatus;
};
