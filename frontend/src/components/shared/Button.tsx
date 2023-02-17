import { Button } from 'react-bootstrap';
import { VariantProps } from '../../core/bootstrap/Variant';

export interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  size: 'sm' | 'lg' | undefined;
  variant: VariantProps;
  disabled?: boolean;
  href?: string;
  children: React.ReactNode;
  onClick?: (props: any) => void;
}

export const ButtonComponent = (props: ButtonProps) => {
  return (
    <>
      <Button
        type={props.type}
        size={props.size}
        variant={props.variant}
        onClick={props.onClick}
        disabled={props.disabled}
        href={props.href}
      >
        {props.children}
      </Button>
    </>
  );
};
