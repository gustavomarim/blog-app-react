import { useEffect, useState } from "react";
import { Alert as BSAlert } from "react-bootstrap";
import { AlertProps } from "../../types/alert";

export const SweetAlert = ({ message, timeInMS, variant }: AlertProps) => {
  const [showAlert, setShowAlert] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, timeInMS);

    return () => clearTimeout(timer);
  }, []);

  return showAlert ? <BSAlert variant={variant}>{message}</BSAlert> : null;
};
