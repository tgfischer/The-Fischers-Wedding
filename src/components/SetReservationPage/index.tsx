import { Formik, Form as FormikForm, FieldArray, Field } from "formik";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { useSetReservationPage } from "./hooks";
import { Masthead } from "./Masthead";
import { SetReservationFormData, SetReservationPageProps } from "./types";

export const SetReservationPage = (
  props: SetReservationPageProps
): JSX.Element => {
  const { initialValues, handleSubmit } = useSetReservationPage(props);
  return (
    <Page pageTitle="Set your reservation">
      <NavBar />
      <Masthead />
      <Container className="mb-5">
        <Row>
          <Col sm={12}>
            <h2 className="handwritten display-5">Guests</h2>
            <Formik<SetReservationFormData>
              initialValues={initialValues}
              onSubmit={handleSubmit}
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
                              controlId="status"
                            >
                              <Form.Label column sm={4}>
                                Will you be attending our celebration?
                              </Form.Label>
                              <Col sm={8}>
                                <Form.Select>
                                  <option value="" disabled>
                                    Please select an option
                                  </option>
                                  <option value="attending">
                                    Graciously accepts
                                  </option>
                                  <option value="not attending">
                                    Regretfully declines
                                  </option>
                                </Form.Select>
                              </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-1"
                              controlId="meal"
                            >
                              <Form.Label column sm={4}>
                                Please pick an option for dinner
                              </Form.Label>
                              <Col sm={8}>
                                <Form.Select>
                                  <option value="" disabled>
                                    Please select an option
                                  </option>
                                  <option value="attending">Chicken</option>
                                </Form.Select>
                              </Col>
                            </Form.Group>
                            <Form.Group
                              as={Row}
                              className="mb-1"
                              controlId="song"
                            >
                              <Form.Label column sm={4}>
                                What song would get you on the dance floor?
                              </Form.Label>
                              <Col sm={8}>
                                <Form.Control placeholder="Please enter a song title and artist" />
                              </Col>
                            </Form.Group>
                          </div>
                        ))}
                      </>
                    )}
                  />
                  <div className="d-flex justify-content-end">
                    <Button type="submit">Save reservation</Button>
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
