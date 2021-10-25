import L from "leaflet";
import { Marker, MarkerProps } from "react-leaflet";

type OpenStreetMapMarkerProps = Omit<MarkerProps, "icon"> & {
  colour?: "blue" | "red";
};

type GetIconOptions = Pick<OpenStreetMapMarkerProps, "colour">;

const getIcon = ({ colour }: GetIconOptions) =>
  L.icon({
    iconUrl: `/images/marker-icon-${colour}.png`,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41]
  });

const OpenStreetMapMarker = ({
  colour = "blue",
  ...props
}: OpenStreetMapMarkerProps): JSX.Element => (
  <Marker {...props} icon={getIcon({ colour })} />
);

export default OpenStreetMapMarker;
