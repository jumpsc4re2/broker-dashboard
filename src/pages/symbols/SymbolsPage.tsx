import { useEffect,useState } from "react";

import { DataTable } from "@/components/data-table/DataTableComponent";

import { columns, type Symbol } from "./columns";

export default function SymbolsPage() {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSymbols = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/symbols");
        const symbols = await response.json();
        setSymbols(symbols);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSymbols();
  }, []);

  return (
    <DataTable
      title="Symbols"
      error={error}
      isLoading={isLoading}
      columns={columns}
      data={symbols}
    />
  );
}
