import { Button, Card, ListGroup } from "react-bootstrap";

import { TableDto } from "../../types";

import { TableAssignmentGuest } from "./TableAssignmentGuest";

type TableCardProps = {
  table: TableDto;
  tableNumber: number;
};

export const TableCard = ({ table, tableNumber }: TableCardProps) => (
  <Card className="border-0">
    <Card.Header className="d-flex justify-content-between align-items-center">
      <div>
        Table {tableNumber}: {table.name} <small>({table.guests.length})</small>
      </div>
      <Button variant="outline" size="sm">
        Delete table
      </Button>
    </Card.Header>
    <Card.Body className="p-0">
      <ListGroup variant="flush">
        {table.guests.map((guest) => (
          <TableAssignmentGuest key={guest.id} guest={guest} />
        ))}
      </ListGroup>
    </Card.Body>
  </Card>
);
