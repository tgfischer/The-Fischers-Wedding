import { ListGroup, ListGroupProps } from "react-bootstrap";

import { LoadingSpinner } from "../LoadingSpinner";

import { useUnassignedGuestsQuery } from "./hooks";
import { UnassignedGuest } from "./UnassignedGuest";

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
        data?.guests.map((guest) => (
          <UnassignedGuest key={guest.id} guest={guest} />
        ))
      )}
    </ListGroup>
  );
};
