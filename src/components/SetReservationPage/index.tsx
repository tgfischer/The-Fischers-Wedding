import clsx from "clsx";
import { Formik, Form as FormikForm, FieldArray, Field } from "formik";
import { eq } from "lodash/fp";
import { useCallback, useMemo, useRef, ChangeEvent } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import { SetReservationBody } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { Accommodations } from "./Accommodations";
import { Footer } from "./Footer";
import { useSetReservationPage } from "./hooks";
import { Location } from "./Location";
import { Masthead } from "./Masthead";
import { Registry } from "./Registry";
import { SetReservationPageProps } from "./types";

export const SetReservationPage = (
  props: SetReservationPageProps
): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { schema, isSubmitting, isSuccess, initialValues, handleSubmit } =
    useSetReservationPage(props);

  const isAlertVisible = useMemo(() => {
    const guests = props.reservation.guests.map((guest) => ({
      ...guest,
      hasMealRestriction: guest.meal ? "yes" : "no"
    }));
    return !isSubmitting && (isSuccess || schema.isValidSync({ guests }));
  }, [isSubmitting, isSuccess, props.reservation.guests, schema]);

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
      <NavBar user={props.user} />
      <Masthead
        onClickSetReservation={handleScroll}
        reservation={props.reservation}
      />
      <Container ref={scrollRef} className="py-5">
        <Row>
          <Col md>
            <h2 className="handwritten display-5">RSVP</h2>
            {isAlertVisible && (
              <Alert variant="success">
                Your reservation has been received. Thank you!
              </Alert>
            )}
            <Formik<SetReservationBody>
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={schema}
            >
              {({ values, setFieldValue }) => (
                <FormikForm>
                  <FieldArray
                    name="guests"
                    render={() => (
                      <>
                        {values.guests.map(
                          (
                            { firstName, lastName, hasMealRestriction, songs },
                            i
                          ) => (
                            <div key={i} className="my-3">
                              <h4>
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
                                    controlId={`guests.${i}.hasMealRestriction`}
                                  >
                                    <Form.Label column sm={4}>
                                      Do you have any food allergies or
                                      restrictions?
                                    </Form.Label>
                                    <Col sm={8}>
                                      <Row className="g-1">
                                        <Col sm={3}>
                                          <Field
                                            as={Form.Select}
                                            name={`guests.${i}.hasMealRestriction`}
                                            onChange={(
                                              e: ChangeEvent<HTMLSelectElement>
                                            ) => {
                                              setFieldValue(
                                                `guests.${i}.hasMealRestriction`,
                                                e.target.value
                                              );
                                              setFieldValue(
                                                `guests.${i}.meal`,
                                                ""
                                              );
                                            }}
                                          >
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                          </Field>
                                        </Col>
                                        <Col sm={9}>
                                          <Form.Control
                                            as={Field}
                                            className={clsx({
                                              "d-none":
                                                hasMealRestriction === "no"
                                            })}
                                            name={`guests.${i}.meal`}
                                            placeholder="What is your meal restriction?"
                                          />
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Form.Group>
                                </>
                              )}
                              <Form.Group
                                as={Row}
                                className="mb-1"
                                controlId={`guests.${i}.songs`}
                              >
                                <Form.Label column sm={4}>
                                  What song would get you on the dance floor?
                                </Form.Label>
                                <Col sm={8}>
                                  <FieldArray
                                    name={`guests.${i}.songs`}
                                    render={() =>
                                      songs.map((song, j) => (
                                        <Row key={j} className="g-1">
                                          <Col sm={6}>
                                            <Form.Control
                                              as={Field}
                                              name={`guests.${i}.songs.${j}.name`}
                                              placeholder="Please enter a song name"
                                            />
                                          </Col>
                                          <Col sm={6}>
                                            <Form.Control
                                              as={Field}
                                              name={`guests.${i}.songs.${j}.artist`}
                                              placeholder="Please enter the song's artist"
                                            />
                                          </Col>
                                        </Row>
                                      ))
                                    }
                                  />
                                </Col>
                              </Form.Group>
                            </div>
                          )
                        )}
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
        <Location invitations={props.reservation.invitations} />
        <Accommodations />
        <Registry />
        <Footer />
      </Container>
    </Page>
  );
};
