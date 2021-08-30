import { Container, Row, Col } from "react-bootstrap";

export const Masthead = (): JSX.Element => (
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
          <h3 className="handwritten my-5 display-6">September 10th, 2022</h3>
          <p className="text-uppercase">Kincardine Ontario</p>
        </Col>
      </Row>
    </Container>
  </div>
);
