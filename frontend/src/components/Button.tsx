import { Button } from 'react-bootstrap';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  size: 'sm' | 'lg';
  children: any;
  variant: string;
  href?: string;
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
        href={props.href}
      >
        {props.children}
      </Button>
    </>
  );
};
