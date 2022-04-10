import { Row, Col, Table } from "react-bootstrap";

type RegistryType = {
  name: string;
  url: string;
};

const registries: RegistryType[] = [
  {
    name: "The Bay",
    url: "https://registry.thebay.com/registry/view-registry/the-fischers-wedding"
  },
  {
    name: "Amazon",
    url: "https://www.amazon.ca/wedding/share/the-fischers-wedding"
  },
  {
    name: "Bed, Bath, & Beyond",
    url: "https://www.bedbathandbeyond.ca/store/giftregistry/viewregistryguest/551387255"
  }
];

export const Registry = () => (
  <Row>
    <Col md>
      <h2 className="handwritten display-5">Registries</h2>
      <p>
        If you would like to honour us with a gift, we are registered at the
        following websites
      </p>
      <Table className="border" responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {registries.map(({ name, url }) => (
            <tr key={url}>
              <td>{name}</td>
              <td>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  </Row>
);
