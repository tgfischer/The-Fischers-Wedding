import { Auth } from "@supabase/ui";
import { Container, Row, Col } from "react-bootstrap";

import { useAnonymousComponent } from "../../hooks";
import { supabase } from "../../supabase";
import { Page } from "../Page";

export const LoginPage = (): JSX.Element => {
  useAnonymousComponent();
  return (
    <Page pageTitle="Login">
      <div className="vh-100 d-flex align-items-center">
        <Container fluid>
          <Row>
            <Col md={{ offset: 4, span: 4 }} sm={12}>
              <Auth supabaseClient={supabase} />
            </Col>
          </Row>
        </Container>
      </div>
    </Page>
  );
};
