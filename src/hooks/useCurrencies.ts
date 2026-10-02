import { useEffect, useState } from "react";

import type { Currency } from "@/pages/currencies/columns";

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCurrencies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/currencies");
        const data = await response.json();
        setCurrencies(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrencies();
  }, []);

  return { currencies, error, isLoading };
}
