import { useMutation } from "react-query";
import api from "../core/api/ApiService";
import { LoginProps } from "../types/login";

export const useLogin = () => {
  const loginMutation = useMutation((dataForm: LoginProps) => {
    const { email, password } = dataForm;

    return api.post(
      "/users/login",
      { email, password },
      { withCredentials: true }
    );
  });

  const handleLogin = async (values: LoginProps) => {
    try {
      await loginMutation.mutateAsync(values);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    login: handleLogin,
    loginMutation,
  };
};
