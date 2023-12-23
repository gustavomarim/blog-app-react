import React from "react";
import { Button as BSButton } from "react-bootstrap";
import { ButtonVariantProps } from "../../types/buttonVariant";

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
