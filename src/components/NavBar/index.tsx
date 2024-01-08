import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useLogoutQuery } from "../../hooks/useLogoutQuery";
import { TIME_TO_SHOW_ALERT } from "../../state/constants/timeToShowAlert";
import { RequestErrorProps } from "../../types/requestError";
import { SweetAlert } from "../Alert";

export const NavBar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { data, error, isSuccess, refetch } = useLogoutQuery();
  const navigate = useNavigate();
  
  const THREE_SECONDS_TO_REDIRECT = 3000;

  const handleClickLogout = () => refetch();

  if (isSuccess) {
    setTimeout(() => {
      navigate("/");
    }, THREE_SECONDS_TO_REDIRECT);
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/" className="text-decoration-none">
          <Navbar.Brand>Blog App</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="text-decoration-none nav-link">
              Home
            </Link>
            <Link to="/categories" className="text-decoration-none nav-link">
              Categorias
            </Link>
            {!isLoggedIn && (
              <>
                <Link to="/login" className="text-decoration-none nav-link">
                  Login
                </Link>
                <Link to="/register" className="text-decoration-none nav-link">
                  Registro
                </Link>
              </>
            )}

            {isLoggedIn && <button onClick={handleClickLogout}>Sair</button>}

            {isSuccess && (
              <SweetAlert
                message={!!data ? data.message : "Deslogado com sucesso!"}
                variant="success"
                timeInMS={TIME_TO_SHOW_ALERT}
              />
            )}

            {error && (
              <SweetAlert
                message={
                  (error as RequestErrorProps)?.response?.data?.error ||
                  "Erro ao sair da conta"
                }
                variant="danger"
                timeInMS={TIME_TO_SHOW_ALERT}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
