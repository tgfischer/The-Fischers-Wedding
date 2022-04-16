import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ListGroup } from "react-bootstrap";

import { TableAssignmentGuestDto } from "../../types";

import { useRemoveTableAssignmentMutation } from "./hooks";

type TableAssignmentGuestProps = {
  guest: TableAssignmentGuestDto;
};

export const TableAssignmentGuest = ({ guest }: TableAssignmentGuestProps) => {
  const { mutate: removeTableAssignment, isLoading } =
    useRemoveTableAssignmentMutation();

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center border-bottom">
      <div>
        {guest.firstName} {guest.lastName}
        {guest.status === "pending" && (
          <small className="text-muted ms-2">
            <FontAwesomeIcon icon={faQuestionCircle} />
          </small>
        )}
      </div>
      <div>
        <Button
          onClick={() => removeTableAssignment({ guestId: guest.id })}
          variant="outline"
          size="sm"
          disabled={isLoading}
        >
          Remove
        </Button>
      </div>
    </ListGroup.Item>
  );
};
