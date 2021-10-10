import { Table } from "react-bootstrap";

import { SongRequestDto } from "../../types";

type SongsTableProps = {
  songs: SongRequestDto[];
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
      {songs.map(({ song, requester }) => (
        <tr key={`${requester.firstName} ${requester.lastName}`}>
          <td>{song.name}</td>
          <td>{song.artist}</td>
          <td>
            {requester.firstName} {requester.lastName}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);
