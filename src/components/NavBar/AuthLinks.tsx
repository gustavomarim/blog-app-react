import { Button } from "react-bootstrap";
import { QueryObserverResult } from "react-query";
import { LogoutProps } from "../../types/Logout";
import { Icon } from "../Icon";
import { CustomNavbar } from "./CustomNavbar";

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
          <CustomNavbar.NavItem to="/login" label="Login">
            <Icon iconName="BoxArrowInRight" />
          </CustomNavbar.NavItem>
          <CustomNavbar.NavItem to="/register" label="Criar Conta">
            <Icon iconName="PlusLg" />
          </CustomNavbar.NavItem>
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
