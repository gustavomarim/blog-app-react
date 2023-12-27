import { useQuery } from "react-query";
import api from "../core/api/ApiService";
import { BlogPostProps } from "../types/blogPost";

const getPosts = async (endpoint: string) => {
  const response = await api.get<BlogPostProps>(endpoint);
  return response.data;
};

export const useBlogPost = (endpoint: string) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getPosts(endpoint),
    queryKey: [endpoint],
  });

  return {
    data,
    error,
    isLoading,
  };
};
