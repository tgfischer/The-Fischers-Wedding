import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";

import { ReservationDto } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { ReservationsTable } from "./ReservationsTable";
import { Statistics } from "./Statistics";

export type ReservationsPageProps = {
  reservations: ReservationDto[];
  user: User | null;
};

export const ReservationsPage = ({
  reservations,
  user
}: ReservationsPageProps): JSX.Element => {
  return (
    <Page pageTitle="Reservations">
      <NavBar className="mb-3" active="reservations" user={user} />
      <Container>
        <Statistics reservations={reservations} />
        <Row>
          <Col sm={12}>
            <div className="mb-2 d-flex justify-content-between align-items-center">
              <h3 className="me-3">Reservations</h3>
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
