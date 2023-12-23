import { useState } from "react";
import { useMutation } from "react-query";
import api from "../core/api/ApiService";
import { UserRegisterProps } from "../types/userRegister";

export const useRegister = () => {
  const [user, setUser] = useState(null);

  const registerMutation = useMutation((dataForm: UserRegisterProps) => {
    const { name, email, password, confirmPassword } = dataForm;

    return api.post("/users/register", {
      name,
      email,
      password,
      confirmPassword,
    });
  });

  const handleRegister = async (values: UserRegisterProps) => {
    try {
      await registerMutation.mutateAsync(values);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    user,
    register: handleRegister,
    registerMutation,
  };
};
