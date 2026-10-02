/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/DataTableComponent";

import { columns, type Moderator } from "./columns";

export default function ModeratorsPage() {
  const [moderators, setModerators] = useState<Moderator[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchModerators = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/moderators");
        const moderators = await response.json();
        setModerators(moderators);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchModerators();
  }, []);

  return (
    <DataTable
      title="Moderators"
      isLoading={isLoading}
      columns={columns}
      error={error}
      data={moderators}
    />
  );
}
