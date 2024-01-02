import { useQuery } from "react-query";
import api from "../../core/api/ApiService";
import { CategoryProps } from "../../types/category";

const getAllCategories = async () => {
  try {
    const response = await api.get<CategoryProps[]>("/admin/categories", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar categorias: ${error}`);
  }
};

export const useGetAllCategories = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: "adminGetAllCategories",
    queryFn: getAllCategories,
  });

  return {
    data,
    error,
    isLoading,
  };
};
