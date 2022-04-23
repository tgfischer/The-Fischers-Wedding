import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isNil } from "lodash";
import { Button, Card, ListGroup } from "react-bootstrap";

import { useModal } from "../../hooks/useModal";
import { TableDto } from "../../types";

import { EditTableModal } from "./EditTableModal";
import { useEditTableOrderMutation } from "./hooks";
import { TableAssignmentGuest } from "./TableAssignmentGuest";

type TableCardProps = {
  table: TableDto;
  friendlyTableNumber: number;
};

export const TableCard = ({ table, friendlyTableNumber }: TableCardProps) => {
  const { mutate: handleEditTableOrder, isLoading } =
    useEditTableOrderMutation();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <Card className="border-0">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          Table {friendlyTableNumber}: {table.name}{" "}
          <small>({table.guests.length})</small>
        </div>
        <div>
          <Button
            onClick={() =>
              handleEditTableOrder({
                tableId: table.id,
                prevOrder: table.tableNumber,
                nextOrder: table.prevTableNumber!
              })
            }
            disabled={isLoading || isNil(table.prevTableNumber)}
            variant="outline"
            size="sm"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </Button>
          <Button
            onClick={() =>
              handleEditTableOrder({
                tableId: table.id,
                prevOrder: table.tableNumber,
                nextOrder: table.nextTableNumber!
              })
            }
            disabled={isLoading || isNil(table.nextTableNumber)}
            variant="outline"
            size="sm"
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </Button>
          <Button
            onClick={openModal}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            Edit
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <ListGroup variant="flush">
          {table.guests.map((guest) => (
            <TableAssignmentGuest key={guest.id} guest={guest} />
          ))}
        </ListGroup>
      </Card.Body>
      <EditTableModal table={table} isOpen={isOpen} onHide={closeModal} />
    </Card>
  );
};
