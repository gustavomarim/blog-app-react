import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useLogoutQuery } from "../../hooks/useLogoutQuery";
import { TIME_TO_SHOW_ALERT } from "../../state/constants/timeToShowAlert";
import { RequestErrorProps } from "../../types/requestError";
import { SweetAlert } from "../Alert";
import { Icon } from "../Icon";
import { NavbarRoot } from "./NavbarRoot";

export const NavBar = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
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
        <NavbarRoot.NavbarBrand />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavbarRoot.NavItem to="/" label="Home">
              <Icon iconName="House" />
            </NavbarRoot.NavItem>
            <NavbarRoot.NavItem to="/categories" label="Categorias" />
          </Nav>
          <Nav>
            {/* 
            // TODO - encontrar uma forma de componentizar melhor
            // os Alerts, utilizando componente e algum pattern
             */}
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

            <NavbarRoot.NavbarAdmin isLoggedIn={isLoggedIn} isAdmin={true} />
            <NavbarRoot.AuthLinks
              isLoggedIn={isLoggedIn}
              handleClickLogout={handleClickLogout}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
