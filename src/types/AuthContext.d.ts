import { UserProps } from "./user";

export type AuthContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  login: (values: LoginProps) => Promise<void>;
  loginMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    LoginProps,
    unknown
  >;
};
