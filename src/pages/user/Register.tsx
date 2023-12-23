import { Formik } from "formik";
import { Card, Form } from "react-bootstrap";
import { SweetAlert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { useRegister } from "../../hooks/useRegister";
import { TIME_TO_SHOW_ALERT } from "../../state/constants/timeToShowAlert";
import registerSchema from "../../state/schema/registerSchema";
import { RequestErrorProps } from "../../types/requestError";

export const Register = () => {
  const { register, registerMutation } = useRegister();

  return (
    <>
      {registerMutation.isSuccess && (
        <SweetAlert
          message={registerMutation.data.data.message}
          variant="success"
          timeInMS={TIME_TO_SHOW_ALERT}
        />
      )}
      {registerMutation && (
        <SweetAlert
          message={
            (registerMutation.error as RequestErrorProps)?.response?.data
              ?.error || "Erro ao registrar um novo usuário"
          }
          variant="danger"
          timeInMS={TIME_TO_SHOW_ALERT}
        />
      )}
      <Title>Crie sua conta hoje:</Title>
      <Formik
        validationSchema={registerSchema}
        onSubmit={(values, { resetForm }) => {
          register(values);
          resetForm();
        }}
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Input
                  label="Nome"
                  id="name"
                  type="text"
                  name="name"
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
                  label="Email"
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                >
                  <Form.Control.Feedback type="invalid">
                    {errors.email && touched.email && errors.email}
                  </Form.Control.Feedback>
                </Input>

                <Input
                  label="Senha"
                  id="password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                  aria-describedby="passwordHelpBlock"
                >
                  <Form.Text id="passwordHelpBlock" muted>
                    Sua senha deve ter de 8 a 20 caracteres, conter letras e
                    números, e não deve conter espaços, caracteres especiais,
                    personagens ou emojis.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.password && touched.password && errors.password}
                  </Form.Control.Feedback>
                </Input>

                <Input
                  label="Redigite a Senha"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={!!errors.confirmPassword}
                >
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                  </Form.Control.Feedback>
                </Input>

                <Button type="submit" variant="success">
                  Registrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </>
  );
};
