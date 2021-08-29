import { Fragment } from "react";
import { Table } from "react-bootstrap";
import type { Row, UseExpandedRowProps } from "react-table";

import { ReservationDto } from "../../types";

import { GuestsTable } from "./GuestsTable";
import { useReservationsTable } from "./hooks";

type ReservationsTableProps = {
  reservations: ReservationDto[];
};

type ExpandableRow = Row<ReservationDto> & UseExpandedRowProps<ReservationDto>;

export const ReservationsTable = (
  props: ReservationsTableProps
): JSX.Element => {
  const { rows, visibleColumns, prepareRow, getTableProps, getTableBodyProps } =
    useReservationsTable(props);
  return (
    <Table {...getTableProps()} striped bordered responsive>
      <thead>
        <tr>
          {visibleColumns.map((column) => (
            // eslint-disable-next-line react/jsx-key
            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
          ))}
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.length === 0 && (
          <tr>
            <td className="text-center" colSpan={6}>
              There are no reservations yet
            </td>
          </tr>
        )}
        {rows.map((row) => {
          const expandableRow = row as ExpandableRow;
          prepareRow(expandableRow);
          const { key, ...rowProps } = expandableRow.getRowProps();
          return (
            // eslint-disable-next-line react/jsx-key
            <Fragment key={key}>
              <tr {...rowProps}>
                {expandableRow.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <td
                      {...cell.getCellProps({
                        className: "align-middle"
                      })}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
              {expandableRow.isExpanded && (
                <tr>
                  <td className="p-0" colSpan={visibleColumns.length}>
                    <GuestsTable guests={expandableRow.original.guests} />
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};
