import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";

import { ReservationDto } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { ReservationsTable } from "./ReservationsTable";
import { Statistics } from "./Statistics";

export type ReservationsPageProps = {
  reservations: ReservationDto[];
};

export const ReservationsPage = ({
  reservations
}: ReservationsPageProps): JSX.Element => {
  return (
    <Page pageTitle="Reservations">
      <NavBar className="mb-3" />
      <Container>
        <Statistics reservations={reservations} />
        <Row>
          <Col sm={12}>
            <div className="mb-2 d-flex justify-content-between align-items-center">
              <div className="handwritten display-5 me-3">Reservations</div>
              <div className="d-flex flex-row align-items-center">
                <Button
                  as="a"
                  className="me-3"
                  href="/api/reservations/export"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CSV
                </Button>
                <Link href="/reservations/add" passHref>
                  <Button variant="primary">Add a reservation</Button>
                </Link>
              </div>
            </div>
            <ReservationsTable reservations={reservations} />
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
