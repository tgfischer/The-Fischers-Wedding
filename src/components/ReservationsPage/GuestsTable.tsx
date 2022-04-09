import { Table } from "react-bootstrap";

import { GuestDto } from "../../types";

import { useGuestsTable } from "./hooks";

type GuestsTableProps = {
  guests: GuestDto[];
};

export const GuestsTable = (props: GuestsTableProps): JSX.Element => {
  const { rows, visibleColumns, prepareRow, getTableProps, getTableBodyProps } =
    useGuestsTable(props);
  return (
    <Table {...getTableProps({ className: "m-0" })} responsive>
      <thead>
        <tr>
          {visibleColumns.map((column) => (
            // eslint-disable-next-line react/jsx-key
            <th {...column.getHeaderProps({ className: "border-0" })}>
              {column.render("Header")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <td {...cell.getCellProps({ className: "border-0" })}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
