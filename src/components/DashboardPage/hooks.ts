import { startCase } from "lodash";
import { useMemo } from "react";
import {
  TableInstance,
  useTable,
  useExpanded,
  usePagination,
  CellProps
} from "react-table";

import type { ReservationDto, GuestDto } from "../../types";

import { ExpandableButtonCell } from "./Cells";

type UseReservationsTableOptions = {
  reservations: ReservationDto[];
};

type UseGuestsTableOptions = {
  guests: GuestDto[];
};

export const useReservationsTable = ({
  reservations
}: UseReservationsTableOptions): TableInstance<ReservationDto> => {
  return useTable<ReservationDto>(
    {
      columns: useMemo(
        () => [
          {
            id: "expander",
            Cell: ExpandableButtonCell
          },
          {
            accessor: "id",
            Header: "ID"
          },
          {
            id: "guests",
            Header: "Guests",
            Cell: ({ row }: CellProps<ReservationDto>) =>
              row.original.guests
                .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
                .join(", ")
          },
          {
            accessor: "address",
            Header: "Address"
          },
          {
            accessor: "song",
            Header: "Song"
          }
        ],
        []
      ),
      data: reservations
    },
    useExpanded,
    usePagination
  );
};

export const useGuestsTable = ({
  guests
}: UseGuestsTableOptions): TableInstance<GuestDto> => {
  return useTable<GuestDto>({
    columns: useMemo(
      () => [
        {
          accessor: "id",
          Header: "ID"
        },
        {
          id: "name",
          Header: "Full name",
          Cell: ({ row }: CellProps<GuestDto>) =>
            `${row.original.firstName} ${row.original.lastName}`
        },
        {
          accessor: "status",
          Header: "Reservation status",
          Cell: ({ value }: CellProps<GuestDto>) => startCase(value)
        },
        {
          accessor: "meal",
          Header: "Meal preference"
        }
      ],
      []
    ),
    initialState: useMemo(() => ({ hiddenColumns: ["id"] }), []),
    data: guests
  });
};
