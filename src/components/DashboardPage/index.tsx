import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";

import { ReservationDto } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { ReservationsTable } from "./ReservationsTable";

export type DashboardPageProps = {
  reservations: ReservationDto[];
};

export const DashboardPage = ({
  reservations
}: DashboardPageProps): JSX.Element => {
  return (
    <Page pageTitle="Dashboard">
      <NavBar />
      <Container>
        <Row>
          <Col sm={12}>
            <div className="d-flex mb-2 align-items-center justify-content-between">
              <div className="handwritten display-5">Reservations</div>
              <Link href="/dashboard/reservations/add" passHref>
                <Button variant="primary">Add a reservation</Button>
              </Link>
            </div>
            <ReservationsTable reservations={reservations} />
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
