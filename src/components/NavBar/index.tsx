import { Auth } from "@supabase/ui";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button
} from "react-bootstrap";

import { useNavBar } from "./hooks";
import { NavBarLink } from "./NavBarLink";

export const NavBar = (): JSX.Element => {
  const { handleSignOut } = useNavBar();
  const { user } = Auth.useUser();
  if (!user) {
    return <></>;
  }

  return (
    <BootstrapNavbar className="mb-3" variant="dark" bg="dark">
      <Container>
        <BootstrapNavbar.Text className="text-white">
          Signed in as: {user?.email}
        </BootstrapNavbar.Text>
        <BootstrapNavbar.Toggle aria-controls="navbar-controls" />
        <BootstrapNavbar.Collapse
          id="navbar-controls"
          className="justify-content-end"
        >
          <Nav>
            <NavBarLink href="/">Home</NavBarLink>
            <NavBarLink className="mx-3" href="/dashboard">
              Dashboard
            </NavBarLink>
            <Nav.Item>
              <Button className="ms-3" onClick={handleSignOut}>
                Log out
              </Button>
            </Nav.Item>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};
