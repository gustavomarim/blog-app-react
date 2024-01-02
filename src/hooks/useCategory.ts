import { useMutation, useQuery } from "react-query";
import api from "../core/api/ApiService";
import { CategoryProps } from "../types/category";

const getAllCategories = async () => {
  const response = await api.get<CategoryProps[]>("/categories");
  return response.data;
};

const getCategoryBySlug = async (slug: string) => {
  const response = await api.get<CategoryProps>(`/category/${slug}`);
  return response.data;
};

export const useCategory = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryFn: getAllCategories,
    queryKey: ["getAllCategories"],
  });

  const getCategory = async (slug: string) => {
    try {
      const category = getCategoryBySlug(slug);
      return category;
    } catch (error) {
      console.error(`Erro ao buscar categoria por slug: ${error}`);
    }
  };

  const createCategoryMutation = useMutation((values: CategoryProps) => {
    const { name, slug } = values;

    return api.post("/admin/categories", {
      name,
      slug,
    });
  });

  const handleCreateCategory = async (values: CategoryProps) => {
    try {
      await createCategoryMutation.mutateAsync(values);
    } catch (error) {
      console.error(`Houve um erro ao criar a categoria: ${error}`);
    }
  };

  const removeCategoryMutation = useMutation(
    (categoryId: string) =>
      api.delete(`/admin/categories/${categoryId}`, { withCredentials: true }),
    {
      onSuccess: () => {
        // Após a remoção bem-sucedida, refetch os dados
        // da consulta para atualizar o componente
        refetch();
      },
    }
  );

  const handleRemoveCategory = async (categoryId: string) => {
    try {
      await removeCategoryMutation.mutateAsync(categoryId);
    } catch (error) {
      console.error(`Houve um erro ao deletar a categoria: ${error}`);
    }
  };

  return {
    data,
    error,
    isLoading,
    getCategory,
    createCategoryMutation,
    handleCreateCategory,
    removeCategoryMutation,
    handleRemoveCategory,
  };
};
