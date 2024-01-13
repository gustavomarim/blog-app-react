import { Spinner } from "react-bootstrap";

export const CustomSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h3 className="text-dark">Carregando...</h3>
      <Spinner animation="grow" variant="dark" />
      <Spinner animation="grow" variant="dark" />
      <Spinner animation="grow" variant="dark" />
    </div>
  );
};
