import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListGroup, Form, Row, Col } from "react-bootstrap";

import { UnassignedGuestDto } from "../../types";

import { useUnassignedGuest } from "./hooks";

export type UnassignedGuestProps = {
  guest: UnassignedGuestDto;
};

export const UnassignedGuest = ({ guest }: UnassignedGuestProps) => {
  const { tables, handleTableAssignment, isSubmitting } =
    useUnassignedGuest(guest);

  return (
    <ListGroup.Item key={guest.id}>
      <Row className="d-flex align-items-center">
        <Col className="d-flex align-items-center" md={6} sm={12}>
          <div>
            <p className="m-0" style={{ lineHeight: 1.25 }}>
              {guest.firstName} {guest.lastName}
            </p>
            <small className="text-muted">{guest.reservationId}</small>
          </div>
          {guest.status === "pending" && (
            <small className="text-muted ms-3">
              <FontAwesomeIcon icon={faQuestionCircle} />
            </small>
          )}
        </Col>
        <Col md={6} xs={12}>
          {tables.length === 0 ? null : (
            <Form.Select
              name="tableName"
              onChange={handleTableAssignment}
              disabled={isSubmitting}
              defaultValue={-1}
            >
              <option disabled value={-1}>
                Select a table
              </option>
              {tables.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Form.Select>
          )}
        </Col>
      </Row>
    </ListGroup.Item>
  );
};
