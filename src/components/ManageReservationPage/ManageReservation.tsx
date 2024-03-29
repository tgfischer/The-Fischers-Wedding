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
  pageTitle,
  actions,
  user
}: ManageReservationProps<TData>): JSX.Element => (
  <Page pageTitle={pageTitle}>
    <NavBar className="mb-3" user={user} />
    <Container>
      <Row className="mb-3">
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
                      <h3 className="mb-2">{pageTitle}</h3>
                      <Row className="mb-3">
                        <Col md>
                          <p className="m-0">Reservation for:</p>
                          <Form.Check
                            as={Field}
                            type="checkbox"
                            name="invitations"
                            label="Cermony"
                            value="ceremony"
                            inline
                          />
                          <Form.Check
                            as={Field}
                            type="checkbox"
                            name="invitations"
                            label="Dinner"
                            value="dinner"
                            inline
                          />
                          <Form.Check
                            as={Field}
                            type="checkbox"
                            name="invitations"
                            label="Reception"
                            value="reception"
                            inline
                          />
                        </Col>
                      </Row>
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
                      {values.guests.map((_, i) => (
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
                      <div className="d-flex justify-content-between">
                        <Button
                          className="me-3 mb-3"
                          onClick={() =>
                            guestsFieldArray.push({
                              firstName: "",
                              lastName: ""
                            })
                          }
                        >
                          Add a guest
                        </Button>
                        <div>
                          {actions}
                          <Button
                            type="submit"
                            className="mb-3"
                            disabled={
                              isSubmitting || !schema.isValidSync(values)
                            }
                          >
                            {pageTitle}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                />
              </FormikForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  </Page>
);
