import { Auth } from "@supabase/ui";
import { Container, Row, Col } from "react-bootstrap";

import { supabase } from "../../supabase";
import { Page } from "../Page";

export const ResetPasswordPage = (): JSX.Element => (
  <Page pageTitle="Reset password">
    <div className="vh-100 d-flex align-items-center">
      <Container fluid>
        <Row>
          <Col md={{ offset: 4, span: 4 }} sm={12}>
            <Auth.UpdatePassword supabaseClient={supabase} />
          </Col>
        </Row>
      </Container>
    </div>
  </Page>
);
