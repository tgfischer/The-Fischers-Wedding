import { Table } from "react-bootstrap";

import { SongDto } from "../../types";

type SongsTableProps = {
  songs: SongDto[];
};

export const SongsTable = ({ songs }: SongsTableProps): JSX.Element => (
  <Table responsive striped bordered>
    <thead>
      <tr>
        <th>Song ({songs.length})</th>
        <th>Requester</th>
      </tr>
    </thead>
    <tbody>
      {songs.map(({ song, requester }) => (
        <tr key={`${requester.firstName} ${requester.lastName}`}>
          <td>{song}</td>
          <td>
            {requester.firstName} {requester.lastName}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);
