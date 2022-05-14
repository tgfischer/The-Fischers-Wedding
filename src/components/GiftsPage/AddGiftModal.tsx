import { Formik, Form as FormikForm, Field } from "formik";
import { useMemo } from "react";
import { Modal, Form, Button } from "react-bootstrap";

import { GiftGuestDto } from "../../types";
import { Select } from "../Select";

import { useAddGiftModal } from "./hooks";
import type { AddGiftFormData, GiftGuestSelectOptions } from "./types";

export type AddGiftModalProps = {
  guests: GiftGuestDto[];
  isOpen?: boolean;
  onHide: () => void;
};

export const AddGiftModal = ({ guests, isOpen, onHide }: AddGiftModalProps) => {
  const { isLoading, handleSubmit, validationSchema } = useAddGiftModal({
    onHide
  });
  const options = useMemo(
    () =>
      guests.map(({ id, firstName, lastName }) => ({
        label: `${firstName} ${lastName}`,
        value: id.toString()
      })),
    []
  );

  return (
    <Modal show={isOpen} onHide={onHide}>
      <Modal.Header closeButton>Add gift</Modal.Header>
      <Formik<AddGiftFormData>
        initialValues={{ description: "", guests: [] }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group controlId="description" className="mb-3">
                <Form.Label>Gift description</Form.Label>
                <Form.Control as={Field} name="description" />
              </Form.Group>
              <Form.Group controlId="guests">
                <Form.Label>Who was the gift from</Form.Label>
                <Select<GiftGuestSelectOptions, true>
                  name="guests"
                  options={options}
                  isMulti
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                disabled={isLoading || !validationSchema.isValidSync(values)}
              >
                Add gift
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};
