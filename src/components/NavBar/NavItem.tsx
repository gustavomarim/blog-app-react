import { Link } from "react-router-dom";

type NavItemProps = {
  to: string;
  label: string;
  children?: React.ReactNode;
};

export const NavItem = ({ to, label, children }: NavItemProps) => {
  return (
    <Link
      to={to}
      className="text-decoration-none nav-link d-flex justify-content-center align-items-center gap-1"
    >
      {children}
      {label}
    </Link>
  );
};
