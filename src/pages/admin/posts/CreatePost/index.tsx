import { Formik } from "formik";
import { Button, Card, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { Navigate } from "react-router-dom";
import { Input } from "../../../../components/Input";
import { CustomSpinner } from "../../../../components/Spinner";
import { Title } from "../../../../components/Title";
import api from "../../../../core/api/ApiService";
import Category from "../../../../core/category/Category";
import { useCategory } from "../../../../hooks/useCategory";
import { postSchema } from "../../../../state/schema/postSchema";
import { BlogPostProps } from "../../../../types/blogPost";

const INITIAL_POST_VALUES: BlogPostProps = {
  _id: "",
  title: "",
  slug: "",
  description: "",
  content: "",
  category: {
    name: "",
    slug: "",
  },
};

export const AdminCreatePost = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useCategory();

  if (!data) return null;
  const category = new Category(data);

  const createPostMutation = useMutation(
    (values: BlogPostProps) => {
      const { title, slug, description, content, category } = values;

      return api.post(`/admin/posts`, {
        title,
        slug,
        description,
        content,
        category,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "getAllPosts",
          "adminGetAllPosts",
          "getPostById",
        ]);
      },
    }
  );

  const handlePostCreation = async (values: BlogPostProps) => {
    try {
      await createPostMutation.mutateAsync(values);
    } catch (error) {
      console.error(`Houve um erro ao criar a postagem. ${error}`);
      throw error;
    }
  };

  if (createPostMutation.isSuccess) return <Navigate to={"/admin/posts"} />;

  if (isLoading) return <CustomSpinner />;

  if (error) return <p>Error...</p>;

  return (
    <>
      <Title>Criar Postagem</Title>

      <Formik
        initialValues={INITIAL_POST_VALUES}
        validationSchema={postSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("🚀 ~ AdminCreatePost ~ values:", values);
          handlePostCreation(values);
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
                  {data &&
                    data.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </Form.Select>
                {}

                <Button type="submit" variant="success" disabled={!isValid}>
                  {isSubmitting ? "Criando postagem..." : "Criar postagem"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </>
  );
};
