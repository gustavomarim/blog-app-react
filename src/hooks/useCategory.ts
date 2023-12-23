import { useQuery } from "react-query";
import api from "../core/api/ApiService";
import { CategoryProps } from "../types/category";

const getAllCategories = async () => {
  const response = await api.get<CategoryProps[]>("/categories");
  return response.data;
};

export const useCategory = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: getAllCategories,
    queryKey: ["getAllCategories"],
  });

  return {
    data,
    error,
    isLoading,
  };
};
