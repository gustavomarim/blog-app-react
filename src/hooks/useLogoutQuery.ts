import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../contexts/AuthContext";
import api from "../core/api/ApiService";
import { LogoutProps } from "../types/Logout";
import { LogoutQueryProps } from "../types/LogoutQuery";

export const useLogoutQuery = (): LogoutQueryProps => {
  const { setUser, setIsLoggedIn } = useContext(AuthContext);

  const logout = async () => {
    try {
      const response = await api.get<LogoutProps>("/users/logout");
      setUser(null);
      setIsLoggedIn(false);
      return response.data;
    } catch (error) {
      console.error(`Houve um erro ao Sair da conta: ${error}`);
      throw error;
    }
  };

  const { data, isLoading, isSuccess, error, refetch } = useQuery({
    queryKey: "logout",
    queryFn: logout,
    enabled: false,
  });

  return { data, isLoading, isSuccess, error, refetch };
};
