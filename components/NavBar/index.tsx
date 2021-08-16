import { Navbar as BootstrapNavbar, Container } from "react-bootstrap";

export const NavBar = (): JSX.Element => (
  <BootstrapNavbar bg="light">
    <Container>
      <BootstrapNavbar.Brand href="#home">Brand link</BootstrapNavbar.Brand>
    </Container>
  </BootstrapNavbar>
);
