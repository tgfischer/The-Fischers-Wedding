import { eq } from "lodash/fp";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Row, Col, Table } from "react-bootstrap";

import { LocationProps } from "./types";

export const Location = ({ invitations }: LocationProps): JSX.Element => {
  const OpenStreetMap = dynamic(() => import("./OpenStreetMap"), {
    ssr: false
  });
  const OpenStreetMapMarker = dynamic(() => import("./OpenStreetMapMarker"), {
    ssr: false
  });
  const isAttendingCeremony = useMemo(
    () => invitations.some(eq("ceremony")),
    [invitations]
  );

  return (
    <Row className="mb-5">
      <Col md>
        <h2 className="handwritten display-5">Location</h2>
        <Row>
          <Col md>
            <Table className="border" responsive>
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {isAttendingCeremony && (
                  <tr>
                    <td>Kincardine Rock Garden</td>
                    <td>155 Durham Street, Kincardine Ontario, N2Z 1A4</td>
                  </tr>
                )}
                <tr>
                  <td>Kincardine Pavilion</td>
                  <td>156 Durham Street, Kincardine Ontario, N2Z 1A4</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md>
            <OpenStreetMap
              className="border"
              center={[44.18088, -81.6389]}
              zoom={17}
            >
              {isAttendingCeremony && (
                <OpenStreetMapMarker
                  position={[44.18124, -81.63895]}
                  colour="red"
                />
              )}
              <OpenStreetMapMarker
                position={[44.18045, -81.63895]}
                colour="red"
              />
            </OpenStreetMap>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
