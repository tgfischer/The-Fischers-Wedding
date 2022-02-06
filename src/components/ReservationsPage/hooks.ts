import { startCase, sum } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import {
  TableInstance,
  useTable,
  useExpanded,
  useSortBy,
  CellProps
} from "react-table";
import * as yup from "yup";

import type { ReservationDto, GuestDto, SongDto } from "../../types";

import {
  EditReservationCell,
  ExpandableButtonCell,
  SetReservationLinkCell
} from "./Cells";

type UseReservationsTableOptions = {
  reservations: ReservationDto[];
};

type UseGuestsTableOptions = {
  guests: GuestDto[];
};

const invitationMapping = {
  ceremony: "Ceremony",
  dinner: "Dinner",
  reception: "Reception"
};

const statusFilterValidationSchema = yup
  .object()
  .shape({
    status: yup
      .array()
      .of(
        yup.string().oneOf(["pending", "attending", "not attending"]).required()
      )
      .required()
  })
  .required();

export const useStatusFilter = () => {
  const router = useRouter();

  return {
    validationSchema: statusFilterValidationSchema,
    handleSubmit: useCallback(({ status }) => {
      const query = { ...router.query, status };
      const url = `${router.pathname}?${new URLSearchParams(query).toString()}`;
      router.push(url);
    }, [])
  };
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
            Header: `ID (${reservations.length})`
          },
          {
            id: "guests",
            Header: `Guests (${sum(
              reservations.map(({ guests }) => guests.length)
            )})`,
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
            id: "invitations",
            Header: "Invitation",
            Cell: ({ row }: CellProps<ReservationDto>) =>
              row.original.invitations
                .map((invitiation) => invitationMapping[invitiation])
                .join(", ")
          },
          {
            id: "status",
            Header: "Status",
            Cell: ({ row }: CellProps<ReservationDto>) =>
              row.original.guests.some(({ status }) => status === "pending")
                ? "Pending"
                : "Completed"
          },
          {
            id: "edit",
            Cell: EditReservationCell
          },
          {
            id: "link",
            Cell: SetReservationLinkCell
          },
          {
            accessor: "createdAt",
            sortType: "datetime"
          }
        ],
        [reservations]
      ),
      data: useMemo(
        () =>
          reservations.map(({ createdAt, updatedAt, ...r }) => ({
            ...r,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt)
          })),
        [reservations]
      ),
      initialState: useMemo(
        () => ({
          hiddenColumns: ["createdAt"],
          sortBy: [{ id: "createdAt", desc: false }]
        }),
        []
      )
    },
    useSortBy,
    useExpanded
  );
};

export const useGuestsTable = ({
  guests
}: UseGuestsTableOptions): TableInstance<GuestDto> => {
  return useTable<GuestDto>({
    columns: useMemo(
      () => [
        {
          id: "name",
          Header: "Full name",
          Cell: ({ row }: CellProps<GuestDto>) =>
            `${row.original.firstName} ${row.original.lastName}`
        },
        {
          accessor: "meal",
          Header: "Meal restrictions",
          Cell: ({ value }: CellProps<GuestDto>) => value?.notes ?? ""
        },
        {
          accessor: "song",
          Header: "Song",
          Cell: ({ value }: CellProps<SongDto>) =>
            value?.name ? `${value?.name} - ${value?.artist}` : ""
        },
        {
          accessor: "status",
          Header: "Status",
          Cell: ({ value }: CellProps<GuestDto>) =>
            value ? startCase(value) : "Pending"
        }
      ],
      []
    ),
    data: guests
  });
};
