export type AuthContextProps = {
  isLoggedIn: boolean;
  user: UserProps | null;
  login: (values: LoginProps) => Promise<void>;
  logout: () => void;
  loginMutation: UseMutationResult<AxiosResponse<any, any>>
};
