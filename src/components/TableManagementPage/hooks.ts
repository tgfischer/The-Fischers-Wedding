import { useState } from "react";

import { GuestDto } from "../../types";

type Table = {
  guests: GuestDto[];
};

export const useTableManagementPage = () => {
  const [tables, setTables] = useState<Table[]>([]);

  return {
    tables,
    setTables
  };
};
