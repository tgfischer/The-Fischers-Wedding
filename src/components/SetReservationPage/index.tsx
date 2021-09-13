import { Formik, Form as FormikForm, FieldArray, Field } from "formik";
import { useMemo } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { useSetReservationPage } from "./hooks";
import { Location } from "./Location";
import { Masthead } from "./Masthead";
import { SetReservationFormData, SetReservationPageProps } from "./types";

export const SetReservationPage = (
  props: SetReservationPageProps
): JSX.Element => {
  const { schema, isSubmitting, isSuccess, initialValues, handleSubmit } =
    useSetReservationPage(props);
  const isAlertVisible = useMemo(
    () =>
      !isSubmitting &&
      (isSuccess || schema.isValidSync({ guests: props.reservation.guests })),
    [isSubmitting, isSuccess, props.reservation.guests, schema]
  );

  return (
    <Page pageTitle="Set your reservation">
      <NavBar />
      <Masthead reservation={props.reservation} />
      <Container className="mb-5">
        <Row>
          <Col md>
            <h2 className="handwritten display-5">R.S.V.P.</h2>
            {isAlertVisible && (
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
                                    Graciously accept
                                  </option>
                                  <option value="not attending">
                                    Regretfully decline
                                  </option>
                                </Field>
                              </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-1"
                              controlId={`guests.${i}.meal.notes`}
                            >
                              <Form.Label column sm={4}>
                                Do you have any food allergies or restrictions?
                              </Form.Label>
                              <Col sm={8}>
                                <Form.Control
                                  as={Field}
                                  name={`guests.${i}.meal.notes`}
                                  placeholder="Please enter any food allergies or restrictions"
                                />
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
        <Location />
      </Container>
    </Page>
  );
};
