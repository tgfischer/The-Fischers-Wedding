import { Formik, Form as FormikForm, Field } from "formik";
import { Modal, Form, Button } from "react-bootstrap";

import { AddTableBody, TableDto } from "../../types";

import { useEditTableModal } from "./hooks";

type EditTableModalProps = {
  table: TableDto;
  isOpen?: boolean;
  onHide: () => void;
};

export const EditTableModal = ({
  table,
  isOpen,
  onHide
}: EditTableModalProps) => {
  const { isLoading, handleSubmit, handleDelete, validationSchema } =
    useEditTableModal({ onHide });

  return (
    <Modal show={isOpen} onHide={onHide}>
      <Modal.Header closeButton>Edit table</Modal.Header>
      <Formik<AddTableBody>
        initialValues={{ name: table.name }}
        onSubmit={({ name }) => handleSubmit({ tableId: table.id, name })}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group controlId="name">
                <Form.Label>Table name</Form.Label>
                <Form.Control as={Field} name="name" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
              <Button
                onClick={() => handleDelete({ tableId: table.id })}
                variant="outline"
              >
                Delete table
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !validationSchema.isValidSync(values)}
              >
                Save table
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};
