import dynamic from "next/dynamic";
import { Row, Col } from "react-bootstrap";

export const Location = (): JSX.Element => {
  const OpenStreetMap = dynamic(() => import("./OpenStreetMap"), {
    ssr: false
  });
  const OpenStreetMapMarker = dynamic(() => import("./OpenStreetMapMarker"), {
    ssr: false
  });

  return (
    <Row className="mb-5">
      <Col md>
        <h2 className="handwritten display-5">Location</h2>
        <Row>
          <Col md>
            <OpenStreetMap center={[44.18088, -81.6389]} zoom={18}>
              <OpenStreetMapMarker position={[44.18045, -81.63895]} />
              <OpenStreetMapMarker position={[44.18124, -81.63895]} />
            </OpenStreetMap>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
