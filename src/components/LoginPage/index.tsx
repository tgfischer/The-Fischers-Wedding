import { Formik, Form as FormikForm, Field } from "formik";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";

import { LoginDto } from "../../types";
import { Page } from "../Page";

import { useLoginPage } from "./hooks";

export const LoginPage = (): JSX.Element => {
  const { validationSchema, isSubmitting, handleSubmit } = useLoginPage();
  return (
    <Page pageTitle="Login">
      <div className="vh-100 d-flex align-items-center">
        <Container fluid>
          <Row className="mb-3">
            <Col
              xl={{ offset: 4, span: 4 }}
              lg={{ offset: 3, span: 6 }}
              md={12}
            >
              <h3 className="handwritten display-5">Login</h3>
              <Card body>
                <Formik<LoginDto>
                  initialValues={{ email: "", password: "" }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ values }) => (
                    <FormikForm>
                      <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control as={Field} name="email" type="email" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          as={Field}
                          name="password"
                          type="password"
                        />
                      </Form.Group>
                      <Row>
                        <Col className="d-flex justify-content-end">
                          <Button
                            type="submit"
                            disabled={
                              isSubmitting ||
                              !validationSchema.isValidSync(values)
                            }
                          >
                            Login
                          </Button>
                        </Col>
                      </Row>
                    </FormikForm>
                  )}
                </Formik>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </Page>
  );
};
