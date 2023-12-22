import React from "react";
import { Button as BSButton } from "react-bootstrap";

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

type ButtonProps = React.ComponentProps<typeof BSButton & "button"> & {
  variant?: ButtonVariantProps;
};

export const Button = ({ variant, ...props }: ButtonProps) => {
  return (
    <>
      <BSButton variant={variant} {...props}>
        {props.children}
      </BSButton>
    </>
  );
};
