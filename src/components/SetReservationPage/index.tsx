import { Formik, Form as FormikForm, FieldArray, Field } from "formik";
import { eq } from "lodash/fp";
import { useCallback, useMemo, useRef } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { Accommodations } from "./Accommodations";
import { useSetReservationPage } from "./hooks";
import { Location } from "./Location";
import { Masthead } from "./Masthead";
import { SetReservationFormData, SetReservationPageProps } from "./types";

import "react-toastify/dist/ReactToastify.css";

export const SetReservationPage = (
  props: SetReservationPageProps
): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null);
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

  const handleScroll = useCallback(
    () => scrollRef.current?.scrollIntoView(),
    []
  );

  return (
    <Page pageTitle="Set your reservation">
      <ToastContainer
        toastStyle={{
          backgroundColor: "#d1e7dd",
          color: "#0f5132",
          fontFamily: "'Martel', serif",
          fontSize: "0.9rem"
        }}
        hideProgressBar
      />
      <NavBar />
      <Masthead
        onClickSetReservation={handleScroll}
        reservation={props.reservation}
      />
      <Container ref={scrollRef} className="py-5">
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
                                <Row className="g-1">
                                  <Col sm={6}>
                                    <Form.Control
                                      as={Field}
                                      name={`guests.${i}.song.name`}
                                      placeholder="Please enter a song name"
                                    />
                                  </Col>
                                  <Col sm={6}>
                                    <Form.Control
                                      as={Field}
                                      name={`guests.${i}.song.artist`}
                                      placeholder="Please enter the song's artist"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Form.Group>
                            <Form.Check
                              as={Field}
                              className="mt-3 mb-4"
                              name={`guests.${i}.isVaccinated`}
                              type="checkbox"
                              label="I have been fully vaccinated against COVID-19 and will provide proof of vaccination before entering the Kincardine Pavilion."
                            />
                          </div>
                        ))}
                      </>
                    )}
                  />
                  <Alert className="border">
                    <Alert.Heading>Proof of Vaccination</Alert.Heading>
                    As required by the Province of Ontario, the Municipality of
                    Kincardine requires that anyone entering the Kincardine
                    Pavilion must provide proof of vaccination. To comply with
                    this mandate, we ask guests to please provide their proof of
                    vaccination receipt along with a photo ID when arriving to
                    the Kincardine Pavilion.
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
        <Accommodations />
      </Container>
    </Page>
  );
};
