import { Form as FormikForm, Formik, FieldArray, Field } from "formik";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";

import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { ManageReservationFormData, ManageReservationProps } from "./types";

export const ManageReservation = <TData extends ManageReservationFormData>({
  handleSubmit,
  isSubmitting,
  schema,
  initialValues,
  pageTitle
}: ManageReservationProps<TData>): JSX.Element => (
  <Page pageTitle={pageTitle}>
    <NavBar />
    <Container>
      <Row>
        <Col xs={12}>
          <Formik<TData>
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
                        <div className="handwritten display-5">{pageTitle}</div>
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
                  {pageTitle}
                </Button>
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  </Page>
);
