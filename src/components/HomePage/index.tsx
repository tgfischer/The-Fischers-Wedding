import { Row, Col, Container } from "react-bootstrap";

import { NavBar } from "../NavBar";
import { Page } from "../Page";

export const HomePage = (): JSX.Element => (
  <Page
    pageTitle="The Fischer's Wedding"
    style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/bg.jpg") bottom center / cover no-repeat`
    }}
  >
    <div className="d-flex flex-column vh-100">
      <NavBar active="home" />
      <div className="d-flex align-items-center text-white flex-grow-1">
        <Container fluid>
          <Row>
            <Col
              className="d-flex justify-content-center align-items-center"
              xl={12}
            >
              <h1 className="handwritten display-1 text-end">Thomas Fischer</h1>
              <h1 className="handwritten px-3">and</h1>
              <h1 className="handwritten display-1">Megan Heikens</h1>
            </Col>
            <Col className="text-center" xs={12}>
              <p className="lead text-uppercase">September 10th, 2022</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  </Page>
);
