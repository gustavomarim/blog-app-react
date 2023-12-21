import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { VariantProps } from '../../core/bootstrap/Variant';

export interface AlertProps {
  message: string;
  variant: VariantProps;
  timeInMS: number;
}

export const AlertComponent = (props: AlertProps) => {
  const [showAlert, setShowAlert] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, props.timeInMS);

    return () => clearTimeout(timer);
  }, []);

  return showAlert ? (
    <Alert variant={props.variant}>{props.message}</Alert>
  ) : null;
};
