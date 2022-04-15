import clsx from "clsx";
import { Button, ListGroup, Spinner } from "react-bootstrap";

import { useTablesQuery } from "./hooks";

type TableSectionProps = {
  className?: string;
};

export const TableSection = ({ className }: TableSectionProps) => {
  const { data, isLoading } = useTablesQuery();

  if (isLoading) {
    return (
      <div className={clsx(className, "d-flex justify-content-center p-3")}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className={className}>
      {data?.tables?.length === 0 ? (
        <p className="p-3 m-0">There are no table assignments yet.</p>
      ) : (
        data?.tables?.map(({ id, name, guests }) => (
          <ListGroup key={id} variant="flush">
            <ListGroup.Item
              className="d-flex justify-content-between align-items-center"
              active
            >
              <div>
                {name} <small>({guests.length})</small>
              </div>
              <div>
                <Button size="sm">Add guest</Button>
                <Button size="sm">Delete table</Button>
              </div>
            </ListGroup.Item>
            {guests.map(({ id, firstName, lastName, status }) => (
              <ListGroup.Item
                key={id}
                className="d-flex justify-content-between align-items-center"
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
        ))
      )}
    </div>
  );
};
