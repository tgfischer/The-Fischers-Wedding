import { Container, Row, Col } from "react-bootstrap";

import { SongRequestDto } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { SongsTable } from "./SongsTable";

export type SongsPageProps = {
  songs: SongRequestDto[];
};

export const SongsPage = ({ songs }: SongsPageProps): JSX.Element => (
  <Page pageTitle="Song Requests">
    <NavBar className="mb-3" />
    <Container>
      <Row>
        <Col sm={12}>
          <h3 className="handwritten display-5">Song Requests</h3>
          <SongsTable songs={songs} />
        </Col>
      </Row>
    </Container>
  </Page>
);
