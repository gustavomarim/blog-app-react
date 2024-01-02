import { useMutation, useQueryClient } from "react-query";
import api from "../../core/api/ApiService";
import { CategoryProps } from "../../types/category";

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  const editCategoryMutation = useMutation(
    (values: CategoryProps) => {
      const { _id, name, slug } = values;

      return api.put<CategoryProps>(
        `/admin/categories/${_id}`,
        { name, slug },
        { withCredentials: true }
      );
    },
    {
      onSuccess: () => {
        // Após a atualização dos dados
        // chama um refetch dos dados nas queries abaixo
        queryClient.invalidateQueries([
          "getCategoryById",
          "getAllCategories",
          "adminGetAllCategories",
        ]);
      },
    }
  );

  const editCategory = async (values: CategoryProps) => {
    try {
      await editCategoryMutation.mutateAsync(values);
    } catch (error) {
      console.error(`Erro ao editar categoria: ${error}`);
    }
  };

  return {
    editCategory,
    editCategoryMutation,
  };
};
