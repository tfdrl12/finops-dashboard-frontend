import type { Transaction } from "@/types/finops";
import { isTransactionsResponse } from "@/lib/guards";

export async function fetchTransactions(): Promise<Transaction[]> {
  const res = await fetch("/api/transactions");

  if (!res.ok) {
    throw new Error(`Failed to load transactions: ${res.status}`);
  }

  const json: unknown = await res.json();

  if (!isTransactionsResponse(json)) {
    throw new Error("Invalid API response shape");
  }

  return json.data;
}
