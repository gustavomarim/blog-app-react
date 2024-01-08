import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavbarBrand = () => {
  return (
    <Link to="/">
      <Navbar.Brand>Blog App</Navbar.Brand>
    </Link>
  );
};
