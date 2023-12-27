import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">Opps!</span> Página não encontrada.
        </p>
        <p className="lead">A página que você procura não existe.</p>
        <Link to="/" className="btn btn-primary">
          Ir para Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
