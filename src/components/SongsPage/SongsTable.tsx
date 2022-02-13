import { Table } from "react-bootstrap";

import { SongDto } from "../../types";

type SongsTableProps = {
  songs: SongDto[];
};

export const SongsTable = ({ songs }: SongsTableProps): JSX.Element => (
  <Table responsive striped bordered>
    <thead>
      <tr>
        <th>Song Name</th>
        <th>Song Artist</th>
        <th>Requester</th>
      </tr>
    </thead>
    <tbody>
      {songs.map(({ name, artist, requester }) => (
        <tr key={`${requester.firstName} ${requester.lastName}`}>
          <td>{name}</td>
          <td>{artist}</td>
          <td>
            {requester.firstName} {requester.lastName}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);
