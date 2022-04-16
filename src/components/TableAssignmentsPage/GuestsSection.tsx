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
        data?.guests.map(({ id, firstName, lastName, status }) => (
          <ListGroup.Item
            key={id}
            className="d-flex align-items-center justify-content-between"
          >
            {firstName} {lastName}
            {status === "pending" && (
              <small className="fst-italic text-muted">Pending</small>
            )}
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
};
