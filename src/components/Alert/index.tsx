import { useEffect, useState } from 'react';
import { Alert as BSAlert } from 'react-bootstrap';
import { VariantProps } from '../../core/bootstrap/Variant';

export interface AlertProps {
  message: string;
  variant: VariantProps;
  timeInMS: number;
}

export const SweetAlert = (props: AlertProps) => {
  const [showAlert, setShowAlert] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, props.timeInMS);

    return () => clearTimeout(timer);
  }, []);

  return showAlert ? (
    <BSAlert variant={props.variant}>{props.message}</BSAlert>
  ) : null;
};