import { useQuery } from "react-query";
import api from "../../core/api/ApiService";
import { CategoryProps } from "../../types/category";

const getCategoryById = async (id: string) => {
  try {
    const response = await api.get<CategoryProps>(`/admin/categories/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar categoria: ${error}`);
  }
};

export const useGetCategoryById = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getCategoryById(id),
    queryKey: "getCategoryById",
  });

  return {
    data,
    error,
    isLoading,
  };
};
