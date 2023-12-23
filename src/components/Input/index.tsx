import React from "react";
import { Form } from "react-bootstrap";

type InputProps = React.ComponentProps<typeof Form.Control & "input"> & {
  children?: React.ReactNode;
};

export const Input = ({ id, label, children, ...props }: InputProps) => (
  <Form.Group className="mb-3">
    <Form.Label htmlFor={id}>{label}</Form.Label>
    <Form.Control {...props} />
    {children}
  </Form.Group>
);
