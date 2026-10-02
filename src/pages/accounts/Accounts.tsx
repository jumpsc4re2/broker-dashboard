import { UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/DataTableComponent";

import { type Account, columns } from "./columns";
import CreateAccountDialog from "./CreateAccountDialog";

const baseUrl = import.meta.env.BASE_URL;
console.log(baseUrl);

export default function AccountsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [open, setOpen] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/accounts");
        const accounts = await response.json();
        setAccounts(accounts);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const buttons = [
    {
      title: "Add Account",
      icon: <UserRoundPlus />,
      onClick: () => {
        setOpen(true);
      },
    },
  ];
  return (
    <>
      <DataTable
        title="Accounts"
        columns={columns}
        isLoading={isLoading}
        error={error}
        data={accounts}
        buttons={buttons}
      />
      <CreateAccountDialog open={open} setOpen={setOpen} />
    </>
  );
}
