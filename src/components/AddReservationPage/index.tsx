import type { User } from "@supabase/supabase-js";
import { Form as FormikForm, Formik, FieldArray, Field } from "formik";
import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";

import { GuestDto } from "../../types";
import { NavBar } from "../NavBar";
import { Page } from "../Page";

import { useAddReservationPage } from "./hooks";

export type AddReservationPageProps = {
  user: User;
};

type GuestFormData = Pick<GuestDto, "firstName" | "lastName">;

type AddReservationFormData = {
  address: string;
  guests: GuestFormData[];
};

export const AddReservationPage = (): JSX.Element => {
  const { schema } = useAddReservationPage();
  return (
    <Page pageTitle="Add new reservation">
      <NavBar />
      <Container>
        <Row>
          <Col xs={12}>
            <Formik<AddReservationFormData>
              initialValues={{ address: "", guests: [] }}
              onSubmit={(values) => alert(JSON.stringify(values))}
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
                  <Button type="submit" disabled={!schema.isValidSync(values)}>
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
