import { LoadingSpinner } from "../LoadingSpinner";

import { useTablesQuery } from "./hooks";
import { TableCard } from "./TableCard";

type TableSectionProps = {
  className?: string;
};

export const TableSection = ({ className }: TableSectionProps) => {
  const { data, isLoading } = useTablesQuery();

  if (isLoading) {
    return (
      <LoadingSpinner className="d-flex flex-grow-1 justify-content-center p-3" />
    );
  }

  return (
    <div className={className}>
      {data?.tables.length === 0 ? (
        <p className="p-3 m-0">There are no table assignments yet.</p>
      ) : (
        data?.tables.map((table, i) => (
          <TableCard key={table.id} table={table} friendlyTableNumber={i + 1} />
        ))
      )}
    </div>
  );
};
