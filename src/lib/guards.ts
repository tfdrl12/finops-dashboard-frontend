import type { Transaction } from "@/types/finops";

type TransactionsResponse = { data: Transaction[] };

export function isTransactionsResponse(value: unknown): value is TransactionsResponse {
  if (typeof value !== "object" || value === null) return false;

  if (!("data" in value)) return false;

  const data = (value as Record<string, unknown>).data;
  if (!Array.isArray(data)) return false;

  return data.every((item) => {
    if (typeof item !== "object" || item === null) return false;
    const obj = item as Record<string, unknown>;

    return (
      typeof obj.id === "string" &&
      typeof obj.date === "string" &&
      typeof obj.merchant === "string" &&
      typeof obj.category === "string" &&
      typeof obj.amount === "number" &&
      typeof obj.status === "string"
    );
  });
}
