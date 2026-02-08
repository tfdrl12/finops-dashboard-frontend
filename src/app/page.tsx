"use client";

import { useEffect, useMemo, useState } from "react";
import type { Transaction } from "@/types/finops";
import { fetchTransactions } from "@/lib/api";

type LoadState = "idle" | "loading" | "success" | "error";

export default function DashboardPage() {
  const [state, setState] = useState<LoadState>("idle");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setState("loading");
      try {
        const data = await fetchTransactions();
        if (!isMounted) return;
        setTransactions(data);
        setState("success");
      } catch {
        if (!isMounted) return;
        setState("error");
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

    const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return transactions;

    return transactions.filter((t) => {
      return (
        t.merchant.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)
      );
    });
  }, [transactions, query]);

    const total = useMemo(() => {
    return filtered.reduce((sum, t) => sum + t.amount, 0);
  }, [filtered]);

  const failedCount = useMemo(() => {
    return filtered.filter((t) => t.status === "failed").length;
  }, [filtered]);

    return (
    <section>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <div style={{ padding: 12, border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)" }}>
          Total spend: <b>${total.toFixed(2)}</b>
        </div>

        <div style={{ padding: 12, border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)" }}>
          Failed: <b>{failedCount}</b>
        </div>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by merchant / category / status"
        style={{
          width: "100%",
          padding: 12,
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          background: "var(--color-panel)",
          color: "var(--color-text)",
          marginBottom: 16,
        }}
      />

      {state === "loading" && <div>Loading transactions…</div>}
      {state === "error" && <div>Failed to load data. Try refreshing.</div>}

      {state === "success" && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left">Date</th>
              <th align="left">Merchant</th>
              <th align="left">Category</th>
              <th align="right">Amount</th>
              <th align="left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.merchant}</td>
                <td>{t.category}</td>
                <td style={{ textAlign: "right" }}>${t.amount.toFixed(2)}</td>
                <td>{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

