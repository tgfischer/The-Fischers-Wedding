import { ListGroup, ListGroupProps } from "react-bootstrap";

import { GuestDto } from "../../types";

type GuestsSectionProps = Pick<ListGroupProps, "className" | "style"> & {
  guests: GuestDto[];
};

export const GuestsSection = ({
  guests,
  className,
  style
}: GuestsSectionProps) => (
  <ListGroup className={className} style={style} variant="flush">
    {guests.map(({ id, firstName, lastName, status }) => (
      <ListGroup.Item
        key={id}
        className="d-flex align-items-center justify-content-between"
      >
        {firstName} {lastName}
        {status === "pending" && (
          <small className="fst-italic text-muted">Pending</small>
        )}
      </ListGroup.Item>
    ))}
  </ListGroup>
);
