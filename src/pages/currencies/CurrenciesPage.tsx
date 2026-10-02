import { DataTable } from "@/components/data-table/DataTableComponent";
import { useCurrencies } from "@/hooks/useCurrencies";

import { columns } from "./columns";

export default function CurrenciesPage() {
  const { currencies, error, isLoading } = useCurrencies();

  return (
    <>
      <DataTable
        title="Currencies"
        isLoading={isLoading}
        error={error}
        columns={columns}
        data={currencies}
      />
    </>
  );
}
