import { Formik, Form as FormikForm, FieldArray, Field } from "formik";
import { eq } from "lodash/fp";
import { useMemo } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { Accomodations } from "./Accommodations";
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
  const isAttendingDinner = useMemo(
    () => props.reservation.invitations.some(eq("dinner")),
    [props.reservation.invitations]
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
                            {isAttendingDinner && (
                              <>
                                <Form.Group
                                  as={Row}
                                  className="mb-1"
                                  controlId={`guests.${i}.meal.notes`}
                                >
                                  <Form.Label column sm={4}>
                                    Do you have any food allergies or
                                    restrictions?
                                  </Form.Label>
                                  <Col sm={8}>
                                    <Form.Control
                                      as={Field}
                                      name={`guests.${i}.meal.notes`}
                                      placeholder="Please enter any food allergies or restrictions"
                                    />
                                  </Col>
                                </Form.Group>
                              </>
                            )}
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
                            <Form.Check
                              as={Field}
                              className="mt-3 mb-4"
                              name={`guests.${i}.isVaccinated`}
                              type="checkbox"
                              label="I have received two valid COVID-19 vaccinations and will provide proof of vaccination before entering the Kincardine Pavilion."
                              required
                            />
                          </div>
                        ))}
                      </>
                    )}
                  />
                  <Alert className="border">
                    <Alert.Heading>Proof of Vaccination</Alert.Heading>
                    <p className="m-0">
                      As required by the Province of Ontario, the Municipality
                      of Kincardine requires that anyone entering the Kincardine
                      Pavilion must provide proof of vaccination. To comply with
                      this mandate, we ask guests to please provide their proof
                      of vaccination receipt when arriving to the Kincardine
                      Pavilion.
                    </p>
                  </Alert>

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
        <Location invitations={props.reservation.invitations} />
        <Accomodations />
      </Container>
    </Page>
  );
};
