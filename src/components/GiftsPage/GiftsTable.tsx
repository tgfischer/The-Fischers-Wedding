import { Table } from "react-bootstrap";

import { GiftDto } from "../../types";

type GiftsTableProps = {
  gifts?: GiftDto[];
};

export const GiftsTable = ({ gifts }: GiftsTableProps): JSX.Element => (
  <Table responsive striped bordered>
    <thead>
      <tr>
        <th>Name</th>
        <th>Gift</th>
      </tr>
    </thead>
    <tbody>
      {!gifts || gifts.length === 0 ? (
        <tr>
          <td colSpan={2} className="text-center">
            No gifts have been recorded yet.
          </td>
        </tr>
      ) : (
        gifts.map(({ id, guests, description }) => (
          <tr key={id}>
            <td>
              {guests
                .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
                .join(", ")}
            </td>
            <td>{description}</td>
          </tr>
        ))
      )}
    </tbody>
  </Table>
);
