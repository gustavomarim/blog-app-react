export type LogoutQueryProps = {
  data: LogoutProps | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  error: any;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<LogoutProps, unknown>>;
};
