import L from "leaflet";
import { Marker, MarkerProps } from "react-leaflet";

const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41]
});

type OpenStreetMapMarkerProps = Omit<MarkerProps, "icon">;

const OpenStreetMapMarker = (props: OpenStreetMapMarkerProps): JSX.Element => (
  <Marker {...props} icon={icon} />
);

export default OpenStreetMapMarker;
