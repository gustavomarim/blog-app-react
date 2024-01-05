import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const NavBar = () => {
  const { isLoggedIn } = useContext(AuthContext);

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
              <Link to="/login" className="text-decoration-none nav-link">
                Login
              </Link>
            )}
            {!isLoggedIn && (
              <Link to="/register" className="text-decoration-none nav-link">
                Registro
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
