import dynamic from "next/dynamic";
import { Row, Col, Table } from "react-bootstrap";

import { Section } from "../Section";

type AccommodationType = {
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  coordinates: { lat: number; long: number };
  code?: string;
  isGroupRate: boolean;
};

const accommodations: AccommodationType[] = [
  {
    name: "TownePlace Suites by Marriott",
    address: "19 Millennium Wy, Kincardine, ON N2Z 0B5",
    phoneNumber: "(519) 395-2665",
    website:
      "https://www.marriott.com/events/start.mi?id=1635797257550&key=GRP",
    coordinates: { lat: 44.16894, long: -81.6138 },
    isGroupRate: true
  },
  {
    name: "Holiday Inn Express & Suites Kincardine",
    address: "2 Millennium Wy, Kincardine, ON N2Z 0B5",
    phoneNumber: "(519) 395-3545",
    website:
      "https://www.ihg.com/holidayinnexpress/hotels/us/en/kincardine/yykin/hoteldetail",
    coordinates: { lat: 44.17349, long: -81.61385 },
    code: "HFW",
    isGroupRate: true
  },
  {
    name: "Inn at the Harbour",
    address: "255 Harbour St, Kincardine, ON N2Z 2X9",
    phoneNumber: "(519) 396-3311",
    website: "https://www.innattheharbour.com/",
    coordinates: { lat: 44.177319, long: -81.6371 },
    isGroupRate: false
  },
  {
    name: "SureStay Plus Hotel by Best Western",
    address: "791 Durham St, Kincardine, ON N2Z 1M4",
    phoneNumber: "(519) 396-8242",
    website:
      "https://www.bestwestern.com/en_US/book/hotels-in-kincardine/surestay-plus-hotel-by-best-western-kincardine/propertyCode.54125.html",
    coordinates: { lat: 44.17277, long: -81.61735 },
    isGroupRate: false
  }
];

const getGroupRateMessage = ({
  isGroupRate,
  code
}: Pick<AccommodationType, "isGroupRate" | "code">): string => {
  if (!isGroupRate) {
    return "No";
  }

  if (!code) {
    return "Yes (no code required)";
  }

  return `Yes (code: ${code})`;
};

export const Accommodations = (): JSX.Element => {
  const OpenStreetMap = dynamic(() => import("./OpenStreetMap"), {
    ssr: false
  });
  const OpenStreetMapMarker = dynamic(() => import("./OpenStreetMapMarker"), {
    ssr: false
  });

  return (
    <Row className="mb-5">
      <Col md>
        <h2 className="handwritten display-5">Accommodations</h2>
        <Row>
          <Col md>
            <Section>
              <Section.Header>Group Rate</Section.Header>
              <p>
                We have a block of rooms available at the{" "}
                <strong>TownePlace Suites </strong> and the{" "}
                <strong>Holiday Inn Express & Suites.</strong> This block of
                rooms will be held until July 8th, 2022. Availability is
                limited, so we would suggest booking early if you require
                accommodations.
              </p>
              <p>
                <strong>
                  You must call the Holiday Inn Express & Suites and provide the
                  code in order to take advantage of their group rate.
                </strong>
              </p>
              <p className="m-0">
                The <strong>Inn at the Harbour</strong> is walking distance to
                the Kincardine Pavilion, but requires a minimum of two nights to
                book.
              </p>
            </Section>
          </Col>
        </Row>
        <Row>
          <Col md>
            <Table className="border" responsive>
              <thead>
                <tr>
                  <th>Hotel Name</th>
                  <th>Address</th>
                  <th>Phone number</th>
                  <th className="text-center">Website</th>
                  <th>Has Group Rate</th>
                </tr>
              </thead>
              <tbody>
                {accommodations.map(
                  ({
                    name,
                    address,
                    phoneNumber,
                    website,
                    code,
                    isGroupRate
                  }) => (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>{address}</td>
                      <td>{phoneNumber}</td>
                      <td className="text-center">
                        <a href={website} target="_blank" rel="noreferrer">
                          Link
                        </a>
                      </td>
                      <td>{getGroupRateMessage({ isGroupRate, code })}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md>
            <OpenStreetMap
              className="border"
              center={[44.175362, -81.628032]}
              zoom={14}
            >
              <OpenStreetMapMarker
                position={[44.18045, -81.63895]}
                colour="red"
              />
              {accommodations.map(({ coordinates }) => (
                <OpenStreetMapMarker
                  key={`${coordinates.lat} ${coordinates.long}`}
                  position={[coordinates.lat, coordinates.long]}
                />
              ))}
            </OpenStreetMap>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
