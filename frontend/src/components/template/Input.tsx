import React from 'react';
import { Form } from 'react-bootstrap';

export default interface InputProps {
  label: string;
  id: string;
  type: 'text' | 'password' | 'email';
  name: string;
  value: string | number | string[] | undefined;
  required?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isValid?: boolean | undefined;
  isInvalid?: boolean | undefined;
  'aria-describedby'?: string;
  children?: React.ReactNode;
}

export const Input = (props: InputProps) => {
  return (
    <Form.Group className='mb-3'>
      <Form.Label htmlFor={props.id}>{props.label}</Form.Label>
      <Form.Control
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        required={props.required}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        isValid={props.isValid}
        isInvalid={props.isInvalid}
        aria-describedby={props['aria-describedby']}
      />
      {props.children}
    </Form.Group>
  );
};
