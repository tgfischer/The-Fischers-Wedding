import { MapContainer, TileLayer, MapContainerProps } from "react-leaflet";

import "leaflet/dist/leaflet.css";

type OpenStreetMapProps = MapContainerProps;

const OpenStreetMap = ({
  children,
  ...props
}: OpenStreetMapProps): JSX.Element => (
  <MapContainer {...props} style={{ height: "400px" }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {children}
  </MapContainer>
);

export default OpenStreetMap;
