import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/DataTableComponent";

import { columns, type Trade } from "./columns";

export default function TradesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [trades, setTrades] = useState<Trade[]>([]);
  useEffect(() => {
    const fetchTrades = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/trades");
        const trades = await response.json();
        setTrades(trades);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrades();
  }, []);
  return (
    <DataTable
      title="Trades"
      isLoading={isLoading}
      error={error}
      columns={columns}
      data={trades}
    />
  );
}
