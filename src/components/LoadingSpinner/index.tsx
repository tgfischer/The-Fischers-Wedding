import { Spinner, SpinnerProps } from "react-bootstrap";

export type LoadingSpinnerProps = Pick<SpinnerProps, "className" | "style">;

export const LoadingSpinner = (props: LoadingSpinnerProps) => (
  <div {...props}>
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);
