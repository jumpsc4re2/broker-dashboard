import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/DataTableComponent";

import { columns, type Position } from "./columns";

export default function PositionsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    setTimeout(() => setIsLoading(true), 0);
    const ws = new WebSocket("ws://localhost:3000");
    ws.onopen = () => {
      console.log("Connection Opened");
      setIsLoading(false);
      setError(false);
    };
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "positions:update") {
        setPositions(message.payload);
      }
    };
    ws.onerror = (event) => {
      console.log("web socket error", event);
      setError(true);
      setIsLoading(false);
    };
    ws.onclose = () => {
      console.log("The connection has been closed successfully.");
    };
    return () => ws.close();
  }, []);
  return (
    <DataTable
      title="Positions"
      columns={columns}
      error={error}
      isLoading={isLoading}
      data={positions}
    />
  );
}
