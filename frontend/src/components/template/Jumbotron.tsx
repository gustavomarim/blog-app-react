import { Link } from "react-router-dom";
import { ButtonComponent } from "../shared/Button";

export const Jumbotron = () => {
  return (
    <>
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Bem-vindo ao Blog Node.js</h1>

          <p className="col-md-8 fs-4 mb-5">
            Este é um Blog simples, desenvolvido com React, Typescript, Node.js
            + Express + MongoDB. Aqui você encontra diversos conteúdos sobre as
            novidades do mundo da computação.
          </p>

          <ButtonComponent variant="primary" type="button" size="lg">
            <Link to="/register">Crie uma Conta</Link>
          </ButtonComponent>
        </div>
      </div>
    </>
  );
};
