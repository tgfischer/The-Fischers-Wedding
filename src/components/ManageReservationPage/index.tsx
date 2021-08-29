import { Form as FormikForm, Formik, FieldArray, Field } from "formik";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";

import { AddReservationFormData } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { useManageReservationPage } from "./hooks";
import { ManageReservationPageProps } from "./types";

export type { ManageReservationPageProps } from "./types";

export const ManageReservationPage = (
  props: ManageReservationPageProps
): JSX.Element => {
  const { handleSubmit, isSubmitting, schema, initialValues } =
    useManageReservationPage(props);
  return (
    <Page pageTitle="Add new reservation">
      <NavBar />
      <Container>
        <Row>
          <Col xs={12}>
            <Formik<AddReservationFormData>
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={schema}
            >
              {({ values }) => (
                <FormikForm>
                  <FieldArray
                    name="guests"
                    render={(guestsFieldArray) => (
                      <>
                        <div className="d-flex mb-2 align-items-center justify-content-between">
                          <div className="handwritten display-5">
                            Add new reservation
                          </div>
                          <Button
                            onClick={() =>
                              guestsFieldArray.push({
                                firstName: "",
                                lastName: ""
                              })
                            }
                          >
                            Add a guest
                          </Button>
                        </div>
                        <Row>
                          <Col md>
                            <Form.FloatingLabel
                              className="mb-3"
                              label="Address"
                              controlId="address"
                            >
                              <Form.Control
                                as={Field}
                                name="address"
                                placeholder="Enter an address"
                              />
                            </Form.FloatingLabel>
                          </Col>
                        </Row>
                        {values.guests.map((friend, i) => (
                          <Card key={i} className="mb-3">
                            <Card.Header className="d-flex align-items-center justify-content-between">
                              <p className="lead m-0">Guest {i + 1}</p>
                              <Button
                                variant="basic"
                                onClick={() => guestsFieldArray.remove(i)}
                              >
                                Remove
                              </Button>
                            </Card.Header>
                            <Card.Body>
                              <Row>
                                <Col md>
                                  <Form.FloatingLabel
                                    label="First name"
                                    controlId={`guests.${i}.firstName`}
                                  >
                                    <Form.Control
                                      as={Field}
                                      name={`guests.${i}.firstName`}
                                      placeholder="Enter a first name"
                                    />
                                  </Form.FloatingLabel>
                                </Col>
                                <Col md>
                                  <Form.FloatingLabel
                                    label="Last name"
                                    controlId={`guests.${i}.lastName`}
                                  >
                                    <Form.Control
                                      as={Field}
                                      name={`guests.${i}.lastName`}
                                      placeholder="Enter a last name"
                                    />
                                  </Form.FloatingLabel>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        ))}
                      </>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting || !schema.isValidSync(values)}
                  >
                    Add reservation
                  </Button>
                </FormikForm>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
