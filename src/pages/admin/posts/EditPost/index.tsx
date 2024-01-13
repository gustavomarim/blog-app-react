import { Formik } from "formik";
import { Button, Card, Form } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { Input } from "../../../../components/Input";
import { Title } from "../../../../components/Title";
import api from "../../../../core/api/ApiService";
import Category from "../../../../core/category/Category";
import { useCategory } from "../../../../hooks/useCategory";
import { postSchema } from "../../../../state/schema/postSchema";
import { BlogPostProps } from "../../../../types/blogPost";

const getPostById = async (id: string) => {
  try {
    const response = await api.get<BlogPostProps>(`/admin/posts/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar postagem: ${error}`);
    throw error;
  }
};

export const AdminEditPost = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ id?: string }>();
  const { id } = params || "";

  const { data: categoryData } = useCategory();

  if (!categoryData) return null;
  const category = new Category(categoryData);

  const { data, error, isLoading } = useQuery({
    queryFn: () => (id ? getPostById(id) : Promise.resolve(null)),
    queryKey: "getPostById",
  });

  const editPostMutation = useMutation(
    (values: BlogPostProps) => {
      const { _id, title, description, content, slug, category } = values;

      return api.put<BlogPostProps>(
        `/admin/posts/${_id}`,
        { title, description, content, slug, category },
        { withCredentials: true }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "adminGetAllPosts",
          "getAllPosts",
          "getPostById",
        ]);
      },
    }
  );

  const editPost = async (values: BlogPostProps) => {
    try {
      await editPostMutation.mutateAsync(values);
    } catch (error) {
      console.error(`Erro ao editar postagem: ${error}`);
      throw error;
    }
  };

  const handleCategoryById = (id: string) =>
    categoryData?.find((category) => category._id === id);

  if (editPostMutation.isSuccess) {
    return <Navigate to={"/admin/posts"} />;
  }

  if (isLoading) <p>Carregando...</p>;

  if (error) return <p>Error</p>;

  return (
    <>
      {data && (
        <>
          <Title>Editar Postagem</Title>
          <Formik
            initialValues={{
              _id: data._id,
              title: data.title,
              slug: data.slug,
              description: data.description,
              content: data.content,
              category: data.category,
              date: data.date,
            }}
            validationSchema={postSchema}
            onSubmit={(values, { resetForm }) => {
              editPost(values);
              resetForm();
            }}
          >
            {({
              values,
              setValues,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
            }) => (
              <Card>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Input
                      label="Título"
                      id="title"
                      type="text"
                      name="title"
                      placeholder="Nome do Título"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.title && !errors.title}
                      isInvalid={!!errors.title}
                    >
                      <Form.Control.Feedback type="invalid">
                        {errors.title && touched.title && errors.title}
                      </Form.Control.Feedback>
                    </Input>

                    <Input
                      label="Slug"
                      id="slug"
                      type="text"
                      name="slug"
                      placeholder="Nome do Slug"
                      value={values.slug}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.slug && !errors.slug}
                      isInvalid={!!errors.slug}
                    >
                      <Form.Control.Feedback type="invalid">
                        {errors.slug && touched.slug && errors.slug}
                      </Form.Control.Feedback>
                    </Input>

                    <Input
                      label="Descrição"
                      id="description"
                      type="text"
                      name="description"
                      placeholder="Descrição"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.description && !errors.description}
                      isInvalid={!!errors.description}
                    >
                      <Form.Control.Feedback type="invalid">
                        {errors.description &&
                          touched.description &&
                          errors.description}
                      </Form.Control.Feedback>
                    </Input>

                    <Input
                      label="Conteúdo"
                      id="content"
                      type="text"
                      name="content"
                      placeholder="Conteúdo"
                      value={values.content}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.content && !errors.content}
                      isInvalid={!!errors.content}
                    >
                      <Form.Control.Feedback type="invalid">
                        {errors.content && touched.content && errors.content}
                      </Form.Control.Feedback>
                    </Input>

                    <label htmlFor="category-select" className="form-label">
                      Categoria
                    </label>
                    <Form.Select
                      aria-label="Seleção de Categoria"
                      id="category-select"
                      className="mb-3"
                      onChange={({ target }) => {
                        const selectedCategoryId = target.value;
                        const selectedCategory =
                          category.findCategoryById(selectedCategoryId);
                        setValues((prevValues: any) => ({
                          ...prevValues,
                          category: selectedCategory,
                        }));
                      }}
                    >
                      <option value={values.category._id}>
                        {values.category.name}
                      </option>
                      {categoryData &&
                        categoryData
                          .filter(
                            ({ _id }) =>
                              !_id?.includes(values.category._id as string)
                          )
                          .map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                    </Form.Select>
                    {}

                    <Button type="submit" variant="success" disabled={!isValid}>
                      {isSubmitting
                        ? "Editando postagem..."
                        : "Editar postagem"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </Formik>
        </>
      )}
    </>
  );
};
