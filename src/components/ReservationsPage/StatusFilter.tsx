import { Formik, Form as FormikForm, Field } from "formik";
import { Form, Button } from "react-bootstrap";

import { useStatusFilter } from "./hooks";
import { StatusFilterFormData } from "./types";

export const StatusFilter = () => {
  const { handleSubmit, validationSchema } = useStatusFilter();
  return (
    <Formik<StatusFilterFormData>
      initialValues={{ status: [] }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <FormikForm className="d-flex align-items-center">
        <Form.Check
          as={Field}
          name="status"
          type="checkbox"
          label="Pending"
          value="pending"
          inline
        />
        <Form.Check
          as={Field}
          name="status"
          type="checkbox"
          label="Attending"
          value="attending"
          inline
        />
        <Form.Check
          as={Field}
          name="status"
          type="checkbox"
          label="Not Attending"
          value="not attending"
          inline
        />
        <Button type="submit">Search</Button>
      </FormikForm>
    </Formik>
  );
};
