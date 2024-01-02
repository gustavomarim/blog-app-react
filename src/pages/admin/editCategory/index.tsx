import { Formik } from "formik";
import { Button, Card, Form } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { Input } from "../../../components/Input";
import { Title } from "../../../components/Title";
import { useEditCategory } from "../../../hooks/admin/useEditCategory";
import { useGetCategoryById } from "../../../hooks/admin/useGetCategoryById";
import { categorySchema } from "../../../state/schema/categorySchema";

export const AdminEditCategory = () => {
  const params = useParams();
  const { id } = params;
  const { data, error, isLoading } = useGetCategoryById(
    !!id ? id : ""
  );
  const { editCategory, editCategoryMutation } = useEditCategory();

  if (editCategoryMutation.isSuccess)
    return <Navigate to={"/admin/categories"} />;

  if (isLoading) return <p>Carregando...</p>;

  return (
    <>
      {data && (
        <>
          <Title>Editar Categoria</Title>
          <Formik
            initialValues={{
              _id: data._id,
              name: data?.name,
              slug: data?.slug,
            }}
            validationSchema={categorySchema}
            onSubmit={(values, { resetForm }) => {
              editCategory(values);
              resetForm();
            }}
          >
            {({
              values,
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
                      label="Nome"
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Nome da Categoria"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.name && !errors.name}
                      isInvalid={!!errors.name}
                    >
                      <Form.Control.Feedback type="invalid">
                        {errors.name && touched.name && errors.name}
                      </Form.Control.Feedback>
                    </Input>

                    <Input
                      label="Slug"
                      id="slug"
                      type="text"
                      name="slug"
                      placeholder="Slug da Categoria"
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

                    <Button type="submit" variant="success" disabled={!isValid}>
                      {isSubmitting
                        ? "Editando categoria..."
                        : "Editar categoria"}
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
