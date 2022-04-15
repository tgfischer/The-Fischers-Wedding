import { Container, Row, Col, Button } from "react-bootstrap";

import { SongDto } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { SongsTable } from "./SongsTable";

export type SongsPageProps = {
  songs: SongDto[];
};

export const SongsPage = ({ songs }: SongsPageProps): JSX.Element => (
  <Page pageTitle="Song Requests">
    <NavBar className="mb-3" active="songs" />
    <Container>
      <Row>
        <Col sm={12}>
          <div className="d-flex align-items-center justify-content-between mb-1">
            <h3>Song Requests</h3>
            <Button
              as="a"
              href="/api/songs/export"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CSV
            </Button>
          </div>
          <SongsTable songs={songs} />
        </Col>
      </Row>
    </Container>
  </Page>
);
