import { Button } from "react-bootstrap";
import { QueryObserverResult } from "react-query";
import { LogoutProps } from "../../types/Logout";
import { NavbarRoot } from "./NavbarRoot";

type AuthLinksProps = {
  isLoggedIn: boolean;
  handleClickLogout: () => Promise<QueryObserverResult<LogoutProps, unknown>>;
};

export const AuthLinks = ({
  isLoggedIn,
  handleClickLogout,
}: AuthLinksProps) => {
  const BUTTON_STYLE = {
    width: "40px",
  };

  return (
    <>
      {!isLoggedIn && (
        <>
          <NavbarRoot.NavItem to="/login" label="Login" />
          <NavbarRoot.NavItem to="/register" label="Registrar" />
        </>
      )}

      {isLoggedIn && (
        <Button
          variant="link"
          className="text-decoration-none nav-link"
          style={BUTTON_STYLE}
          onClick={handleClickLogout}
        >
          Sair
        </Button>
      )}
    </>
  );
};
