import React from "react";
import { Button } from "react-bootstrap";

type ButtonVariantProps =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark"
  | "light"
  | "link"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-info"
  | "outline-dark"
  | "outline-light";

type ButtonProps = React.ComponentProps<typeof Button & "button"> & {
  variant?: ButtonVariantProps;
};

export const ButtonComponent = ({ variant, ...props }: ButtonProps) => {
  return (
    <>
      <Button variant={variant} {...props}>
        {props.children}
      </Button>
    </>
  );
};
