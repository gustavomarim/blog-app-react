import { createContext, useState } from "react";
import { useMutation } from "react-query";
import api from "../core/api/ApiService";
import { AuthContextProps } from "../types/authContext";
import { LoginProps } from "../types/login";
import { UserProps } from "../types/user";

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | null>(null);

  const loginMutation = useMutation((dataForm: LoginProps) => {
    const { email, password } = dataForm;

    return api.post(
      "/users/login",
      { email, password },
      { withCredentials: true }
    );
  });

  const login = async (values: LoginProps) => {
    try {
      const response = await loginMutation.mutateAsync(values);
      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loginMutation,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
