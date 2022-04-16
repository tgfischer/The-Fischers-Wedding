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
    <ListGroup.Item
      key={guest.id}
      className="d-flex justify-content-between align-items-center"
    >
      <Row>
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
      </Row>
      <Col md={6} sm={12}>
        {tables.length === 0 ? null : (
          <Form.Select
            name="tableName"
            onChange={handleTableAssignment}
            disabled={isSubmitting}
          >
            <option disabled selected>
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
    </ListGroup.Item>
  );
};
