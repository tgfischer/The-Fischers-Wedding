import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";

export const Footer = () => (
  <Row className="mt-4">
    <Col className="text-center">
      <FontAwesomeIcon icon={faHeart} />
    </Col>
  </Row>
);
