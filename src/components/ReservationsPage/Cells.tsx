import {
  faCaretRight,
  faCaretDown,
  faEdit,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Button } from "react-bootstrap";
import type { CellProps, UseExpandedRowProps } from "react-table";

import { ReservationDto } from "../../types";

type ExpandableRowProps = CellProps<ReservationDto> & {
  row: UseExpandedRowProps<ReservationDto>;
};

export const ExpandableButtonCell = ({
  row
}: ExpandableRowProps): JSX.Element => (
  <div {...row.getToggleRowExpandedProps({ className: "ps-2" })}>
    <FontAwesomeIcon icon={row.isExpanded ? faCaretDown : faCaretRight} />
  </div>
);

export const EditReservationCell = ({
  row
}: CellProps<ReservationDto>): JSX.Element => (
  <Link href={`/reservations/edit/${row.original.id}`} passHref>
    <Button variant="basic" className="p-0">
      <FontAwesomeIcon icon={faEdit} />
    </Button>
  </Link>
);

export const SetReservationLinkCell = ({
  row
}: CellProps<ReservationDto>): JSX.Element => (
  <Link href={`/${row.original.id}`} passHref>
    <Button
      as="a"
      variant="basic"
      className="p-0"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faExternalLinkAlt} />
    </Button>
  </Link>
);
