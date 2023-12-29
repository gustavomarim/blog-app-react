import { Formik } from "formik";
import { Button, Card, Form } from "react-bootstrap";
import { SweetAlert } from "../../../components/Alert";
import { Input } from "../../../components/Input";
import { Title } from "../../../components/Title";
import { useCategory } from "../../../hooks/useCategory";
import { TIME_TO_SHOW_ALERT } from "../../../state/constants/timeToShowAlert";
import { categorySchema } from "../../../state/schema/categorySchema";

export const AdminAddCategory = () => {
  const { createCategoryMutation, handleCreateCategory } = useCategory();
  
  // TODO - adicionar redirecionamento para '/admin/categories' 
  // ao realizar cadastro de categoria bem sucedido

  return (
    <>
      {createCategoryMutation.isSuccess && (
        <SweetAlert
          message={createCategoryMutation.data.data.message}
          variant="success"
          timeInMS={TIME_TO_SHOW_ALERT}
        />
      )}


      <Title>Nova Categoria</Title>

      <Formik
        initialValues={{ name: "", slug: "" }}
        validationSchema={categorySchema}
        onSubmit={(values, { resetForm }) => {
          handleCreateCategory(values);
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
                  {isSubmitting ? "Criando categoria..." : "Criar categoria"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </>
  );
};
