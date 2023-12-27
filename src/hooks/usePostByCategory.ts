import { useQuery } from "react-query";
import api from "../core/api/ApiService";
import { BlogPostProps } from "../types/blogPost";

const getPostByCategory = async (endpoint: string) => {
  const response = await api.get<BlogPostProps[]>(endpoint);
  return response.data;
};

export const usePostByCategory = (endpoint: string) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getPostByCategory(endpoint),
    queryKey: [endpoint],
  });

  return {
    data,
    error,
    isLoading,
  };
};
