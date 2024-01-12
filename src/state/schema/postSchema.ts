import { ObjectSchema, object, string } from "yup";
import { BlogPostProps } from "./../../types/blogPost.d";

export const postSchema: ObjectSchema<BlogPostProps> = object({
  title: string()
    .min(2, "O título da postagem deve ter no mínimo 2 caracteres")
    .max(80, "O título da postagem deve ter no máximo 80 caracteres")
    .required("O campo título é obrigatório"),
  slug: string()
    .min(2, "O slug da postagem deve ter no mínimo 2 caracteres")
    .max(80, "O slug da postagem deve ter no máximo 80 caracteres")
    .required("O campo slug é obrigatório"),
  description: string()
    .min(2, "A descrição da postagem deve ter no mínimo 2 caracteres")
    .max(150, "A descrição da postagem deve ter no máximo 150 caracteres")
    .required("O campo descrição é obrigatório"),
  content: string()
    .min(2, "O conteúdo da postagem deve ter no mínimo 2 caracteres")
    .max(1000, "O conteúdo da postagem deve ter no máximo 1000 caracteres")
    .required("O campo conteúdo é obrigatório"),
}) as ObjectSchema<BlogPostProps>;
