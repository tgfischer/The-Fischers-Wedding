import { cond, always, T, eq } from "lodash/fp";
import { Container, Row, Col } from "react-bootstrap";

import { ReservationDto } from "../../types";

type MastheadProps = {
  reservation: ReservationDto;
};

const CeremonyInvitation = () => (
  <>
    <p className="text-uppercase lead mb-5">{"4 o'clock in the afternoon"}</p>
    <h3 className="handwritten display-6 mb-1">Kincardine Rock Garden</h3>
    <p className="text-uppercase lead m-0">
      155 Durham Street, Kincardine Ontario, N2Z 1A4
    </p>
    <p className="text-uppercase">Dinner and reception to follow</p>
  </>
);

const ReceptionInvitation = () => (
  <>
    <p className="text-uppercase lead mb-5">{"8 o'clock in the evening"}</p>
    <h3 className="handwritten display-6 mb-1">Kincardine Pavilion</h3>
    <p className="text-uppercase lead m-0">
      156 Durham Street, Kincardine Ontario, N2Z 1A4
    </p>
  </>
);

const getInvitation = cond<ReservationDto, () => JSX.Element>([
  [
    (reservation) => reservation.invitations.some(eq("ceremony")),
    always(CeremonyInvitation)
  ],
  [T, always(ReceptionInvitation)]
]);

export const Masthead = ({ reservation }: MastheadProps): JSX.Element => {
  const Invitation = getInvitation(reservation);
  return (
    <div
      className="d-flex mb-5 py-5 align-items-center text-white"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/bg.jpg") bottom center / cover no-repeat`
      }}
    >
      <Container fluid>
        <Row>
          <Col
            className="d-flex justify-content-center align-items-center my-3"
            xl={12}
          >
            <h1 className="handwritten display-1 text-end">Thomas Fischer</h1>
            <h1 className="handwritten px-3">and</h1>
            <h1 className="handwritten display-1">Megan Heikens</h1>
          </Col>
          <Col className="text-center" xs={12}>
            <p className="text-uppercase lead my-0">
              Together with their families
            </p>
            <p className="text-uppercase lead my-0">
              Invite you to their wedding celebration
            </p>
            <h3 className="handwritten mt-5 mb-1 display-6">
              Saturday, September 10th, 2022
            </h3>
            <Invitation />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
