import { Auth } from "@supabase/ui";
import clsx from "clsx";
import { Navbar as BootstrapNavbar, Container, Button } from "react-bootstrap";

import { useNavBar } from "./hooks";

type NavBarProps = {
  variant?: "transparent-dark";
};

export const NavBar = ({ variant }: NavBarProps): JSX.Element => {
  const { handleSignOut } = useNavBar();
  const { user } = Auth.useUser();
  if (!user) {
    return <></>;
  }

  return (
    <BootstrapNavbar
      className={clsx({
        "navbar-transparent": variant === "transparent-dark"
      })}
    >
      <Container>
        <BootstrapNavbar.Brand>Home</BootstrapNavbar.Brand>
        <BootstrapNavbar.Collapse className="justify-content-end">
          <BootstrapNavbar.Text>
            Signed in as: {user?.email}
          </BootstrapNavbar.Text>
          <Button
            className="ms-3"
            variant="outline-light"
            onClick={handleSignOut}
          >
            Log out
          </Button>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};
