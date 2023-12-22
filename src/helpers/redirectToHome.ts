import { useNavigate } from "react-router-dom";

export const redirectToHome = () => {
  const FOUR_SECONDS_WAIT_TO_REDIRECT = 4000;
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, FOUR_SECONDS_WAIT_TO_REDIRECT);
};
