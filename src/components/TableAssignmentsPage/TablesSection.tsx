import { Button, Card, ListGroup } from "react-bootstrap";

import { LoadingSpinner } from "../LoadingSpinner";

import { useTablesQuery } from "./hooks";

type TableSectionProps = {
  className?: string;
};

export const TableSection = ({ className }: TableSectionProps) => {
  const { data, isLoading } = useTablesQuery();

  if (isLoading) {
    return (
      <LoadingSpinner className="d-flex flex-grow-1 justify-content-center p-3" />
    );
  }

  return (
    <div className={className}>
      {data?.tables.length === 0 ? (
        <p className="p-3 m-0">There are no table assignments yet.</p>
      ) : (
        data?.tables.map(({ id, name, guests }, i) => (
          <Card key={id} className="border-0">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                Table {i + 1}: {name} <small>({guests.length})</small>
              </div>
              <Button variant="outline" size="sm">
                Delete table
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {guests.map(({ id, firstName, lastName, status }) => (
                  <ListGroup.Item
                    key={id}
                    className="d-flex justify-content-between align-items-center border-bottom"
                  >
                    <div>
                      {firstName} {lastName}{" "}
                      {status === "pending" && (
                        <small className="fst-italic text-muted">Pending</small>
                      )}
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Remove guest
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};
