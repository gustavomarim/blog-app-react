export type RequestErrorProps = {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
  };
};
