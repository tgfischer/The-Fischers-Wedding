import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
