import type { NextPage } from "next";
import { Row, Col, Container } from "react-bootstrap";

import { Page } from "../Page";

export const Home: NextPage = () => (
  <Page
    style={{
      background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/images/bg.jpg") center center / cover no-repeat`
    }}
  >
    <div className="vh-100 d-flex align-items-center text-white">
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
            {/* <p className="text-uppercase lead my-0">
              Together with their families
            </p>
            <p className="text-uppercase lead my-0">
              Invite you to their wedding celebration
            </p> */}
            {/* <h3 className="handwritten my-5 display-6">September 10th, 2022</h3> */}
            <p className="lead text-uppercase">September 10th, 2022</p>
          </Col>
        </Row>
      </Container>
    </div>
  </Page>
);
