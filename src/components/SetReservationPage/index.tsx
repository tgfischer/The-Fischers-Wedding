import { Formik, Form as FormikForm, FieldArray, Field } from "formik";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { useSetReservationPage } from "./hooks";
import { Masthead } from "./Masthead";
import { SetReservationFormData, SetReservationPageProps } from "./types";

export const SetReservationPage = (
  props: SetReservationPageProps
): JSX.Element => {
  const { schema, isSubmitting, initialValues, handleSubmit } =
    useSetReservationPage(props);
  return (
    <Page pageTitle="Set your reservation">
      <NavBar />
      <Masthead />
      <Container className="mb-5">
        <Row>
          <Col sm={12}>
            <h2 className="handwritten display-5">R.S.V.P.</h2>
            {schema.isValidSync({ guests: props.reservation.guests }) && (
              <Alert variant="success">
                Your reservation has been received. Thank you!
              </Alert>
            )}
            <Formik<SetReservationFormData>
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={schema}
            >
              {({ values }) => (
                <FormikForm>
                  <FieldArray
                    name="guests"
                    render={() => (
                      <>
                        {values.guests.map(({ firstName, lastName }, i) => (
                          <div key={i} className="my-3">
                            <h4 key={i}>
                              {firstName} {lastName}
                            </h4>
                            <Form.Group
                              as={Row}
                              className="mb-1"
                              controlId={`guests.${i}.status`}
                            >
                              <Form.Label column sm={4}>
                                Will you be attending our celebration?{" "}
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Col sm={8}>
                                <Field
                                  as={Form.Select}
                                  name={`guests.${i}.status`}
                                >
                                  <option value="pending" disabled>
                                    Please select an option
                                  </option>
                                  <option value="attending">
                                    Graciously accepts
                                  </option>
                                  <option value="not attending">
                                    Regretfully declines
                                  </option>
                                </Field>
                              </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-1"
                              controlId={`guests.${i}.meal`}
                            >
                              <Form.Label column sm={4}>
                                Please pick an option for dinner{" "}
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Col sm={8}>
                                <Field
                                  as={Form.Select}
                                  name={`guests.${i}.meal`}
                                >
                                  <option value="" disabled>
                                    Please select an option
                                  </option>
                                  <option value="chicken">Chicken</option>
                                </Field>
                              </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-1"
                              controlId={`guests.${i}.song`}
                            >
                              <Form.Label column sm={4}>
                                What song would get you on the dance floor?
                              </Form.Label>
                              <Col sm={8}>
                                <Form.Control
                                  as={Field}
                                  name={`guests.${i}.song`}
                                  placeholder="Please enter a song title and artist"
                                />
                              </Col>
                            </Form.Group>
                          </div>
                        ))}
                      </>
                    )}
                  />
                  <div className="d-flex justify-content-end">
                    <Button
                      type="submit"
                      disabled={!schema.isValidSync(values) || isSubmitting}
                    >
                      Save reservation
                    </Button>
                  </div>
                </FormikForm>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};
