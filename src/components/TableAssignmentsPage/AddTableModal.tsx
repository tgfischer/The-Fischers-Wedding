import { Formik, Form as FormikForm, Field } from "formik";
import { Modal, Form, Button } from "react-bootstrap";

import { AddTableBody } from "../../types";

import { useAddTableModal } from "./hooks";

type AddTableModalProps = {
  isOpen?: boolean;
  onHide: () => void;
};

export const AddTableModal = ({ isOpen, onHide }: AddTableModalProps) => {
  const { isLoading, handleSubmit, validationSchema } = useAddTableModal({
    onHide
  });

  return (
    <Modal show={isOpen} onHide={onHide}>
      <Modal.Header closeButton>Add table</Modal.Header>
      <Formik<AddTableBody>
        initialValues={{ name: "" }}
        onSubmit={({ name }) => handleSubmit({ name })}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <>
            <Modal.Body>
              <FormikForm>
                <Form.Group controlId="name">
                  <Form.Label>Table name</Form.Label>
                  <Form.Control as={Field} name="name" />
                </Form.Group>
              </FormikForm>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                disabled={isLoading || !validationSchema.isValidSync(values)}
              >
                Add table
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
};
