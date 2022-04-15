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
    {guests.map(({ id, firstName, lastName }) => (
      <ListGroup.Item key={id}>
        {firstName} {lastName}
      </ListGroup.Item>
    ))}
  </ListGroup>
);
