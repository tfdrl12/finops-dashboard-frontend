import { NextResponse } from "next/server";
import type { Transaction } from "@/types/finops";

const transactions: Transaction[] = [
  {
    id: "tx_1001",
    date: "2026-02-01",
    merchant: "AWS",
    category: "Cloud",
    amount: 1240.5,
    status: "completed",
  },
  {
    id: "tx_1002",
    date: "2026-02-03",
    merchant: "Stripe",
    category: "Payments",
    amount: 320.0,
    status: "completed",
  },
  {
    id: "tx_1003",
    date: "2026-02-05",
    merchant: "Figma",
    category: "SaaS",
    amount: 15.0,
    status: "pending",
  },
  {
    id: "tx_1004",
    date: "2026-02-06",
    merchant: "OpenAI",
    category: "Other",
    amount: 60.0,
    status: "failed",
  },
];

export async function GET() {
  return NextResponse.json({ data: transactions });
}
