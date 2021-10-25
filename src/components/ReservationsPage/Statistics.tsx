import { identity, startCase, sum } from "lodash/fp";
import { useMemo } from "react";
import { Row, Col } from "react-bootstrap";

import { Invitation, ReservationDto, Status } from "../../types";

import { Statistic, StatisticProps } from "./Statistic";

type StatisticsProps = {
  reservations: ReservationDto[];
};

const getGuestStatusCount = ({
  reservations,
  status
}: StatisticsProps & { status: Status }): StatisticProps => ({
  statistic: sum(
    reservations.map(
      ({ guests }) => guests.filter((guest) => guest.status === status).length
    )
  ),
  description: startCase(status)
});

const getGuestCount = ({
  reservations,
  invitation,
  transform = identity
}: StatisticsProps & {
  invitation: Invitation;
  transform?: (
    statistic: StatisticProps["statistic"]
  ) => StatisticProps["statistic"];
}): StatisticProps => ({
  statistic: transform(
    sum(
      reservations
        .filter(({ invitations }) => invitations.includes(invitation))
        .map(({ guests }) => guests.length)
    )
  ),
  description: `Invited to ${invitation}`
});

const getGuestInvitationCount = ({
  reservations,
  invitation
}: StatisticsProps & {
  status: Status;
  invitation: Invitation;
}): StatisticProps => ({
  statistic: sum(
    reservations.map(
      ({ guests, invitations }) =>
        guests.filter(
          (guest) =>
            guest.status === "attending" && invitations.includes(invitation)
        ).length
    )
  ),
  description: `Guests attending the ${invitation}`
});

export const Statistics = (props: StatisticsProps): JSX.Element => {
  const statistics = useMemo(
    () => [
      getGuestCount({ ...props, invitation: "ceremony" }),
      getGuestCount({ ...props, invitation: "dinner" }),
      getGuestCount({ ...props, invitation: "reception" }),
      getGuestInvitationCount({
        ...props,
        status: "attending",
        invitation: "ceremony"
      }),
      getGuestInvitationCount({
        ...props,
        status: "attending",
        invitation: "dinner"
      }),
      getGuestInvitationCount({
        ...props,
        status: "attending",
        invitation: "reception"
      }),
      getGuestStatusCount({ ...props, status: "not attending" }),
      getGuestStatusCount({ ...props, status: "pending" })
    ],
    [props]
  );

  return (
    <Row className="mt-4">
      {statistics.map(({ statistic, description }) => (
        <Col key={description}>
          <Statistic statistic={statistic} description={description} />
        </Col>
      ))}
    </Row>
  );
};
