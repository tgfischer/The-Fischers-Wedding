import { Button, Card, ListGroup } from "react-bootstrap";

import { useModal } from "../../hooks/useModal";
import { TableDto } from "../../types";

import { EditTableModal } from "./EditTableModal";
import { TableAssignmentGuest } from "./TableAssignmentGuest";

type TableCardProps = {
  table: TableDto;
  tableNumber: number;
};

export const TableCard = ({ table, tableNumber }: TableCardProps) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <Card className="border-0">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          Table {tableNumber}: {table.name}{" "}
          <small>({table.guests.length})</small>
        </div>
        <Button onClick={openModal} variant="outline" size="sm">
          Edit
        </Button>
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
