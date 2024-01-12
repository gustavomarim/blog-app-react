import { NavDropdown } from "react-bootstrap";
import { NavbarRoot } from "./NavbarRoot";

export const NavbarAdmin = ({
  isLoggedIn,
  isAdmin,
}: {
  isLoggedIn: boolean;
  isAdmin: boolean;
}) => {
  return (
    <>
      {isLoggedIn && isAdmin && (
        <>
          <NavDropdown
            id="admin-controller"
            title="Admin"
            menuVariant="dark"
          >
            <NavDropdown.Item>
              <NavbarRoot.NavItem label="Postagens" to="/admin/posts" />
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <NavbarRoot.NavItem label="Categorias" to="/admin/categories" />
            </NavDropdown.Item>
          </NavDropdown>
        </>
      )}
    </>
  );
};
