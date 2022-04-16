import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListGroup, ListGroupProps } from "react-bootstrap";

import { LoadingSpinner } from "../LoadingSpinner";

import { useUnassignedGuestsQuery } from "./hooks";

type GuestsSectionProps = Pick<ListGroupProps, "className" | "style">;

export const GuestsSection = ({ className, style }: GuestsSectionProps) => {
  const { data, isLoading } = useUnassignedGuestsQuery();

  if (isLoading) {
    return (
      <LoadingSpinner
        className="d-flex justify-content-center p-3 border"
        style={{ flex: "0 0 40%" }}
      />
    );
  }

  return (
    <ListGroup className={className} style={style} variant="flush">
      {data?.guests.length === 0 ? (
        <p className="p-3 m-0">There are no unassigned guests.</p>
      ) : (
        data?.guests.map(
          ({ id, firstName, lastName, reservationId, status }) => (
            <ListGroup.Item key={id} className="d-flex align-items-center">
              <div>
                <p className="m-0">
                  {firstName} {lastName}
                </p>
                <small className="text-muted">{reservationId}</small>
              </div>
              {status === "pending" && (
                <small className="text-muted ms-3">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </small>
              )}
            </ListGroup.Item>
          )
        )
      )}
    </ListGroup>
  );
};
