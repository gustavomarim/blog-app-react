import { object, ObjectSchema, string } from "yup";
import { CategoryProps } from "../../types/category";

export const categorySchema: ObjectSchema<CategoryProps> = object({
  name: string()
    .min(2, "A categoria deve ter no mínimo 2 caracteres")
    .max(80, "Este campo pode conter no máximo 80 caracteres")
    .required("O campo categoria é obrigatório"),
  slug: string()
    .min(2, "A categoria deve ter no mínimo 2 caracteres")
    .max(80, "Este campo pode conter no máximo 80 caracteres")
    .required("O campo slug é obrigatório"),
}) as ObjectSchema<CategoryProps>;
