import { Formik } from "formik";
import { Card, Form } from "react-bootstrap";
import { SweetAlert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { useLogin } from "../../hooks/useLogin";
import { TIME_TO_SHOW_ALERT } from "../../state/constants/timeToShowAlert";
import { loginSchema } from "../../state/schema/loginSchema";
import { RequestErrorProps } from "../../types/requestError";

export const Login = () => {
  const { login, loginMutation } = useLogin();

  return (
    <>
      {loginMutation.isSuccess && (
        <SweetAlert
          message={loginMutation.data.data.message}
          variant="success"
          timeInMS={TIME_TO_SHOW_ALERT}
        />
      )}

      {loginMutation.isError && loginMutation.error && (
        <SweetAlert
          message={
            (loginMutation.error as RequestErrorProps)?.response?.data?.error ||
            "Erro ao realizar login"
          }
          variant="danger"
          timeInMS={TIME_TO_SHOW_ALERT}
        />
      )}

      <Title>Login:</Title>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, { resetForm }) => {
          login(values);
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
        }) => (
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
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
                  <Form.Control.Feedback type="invalid">
                    {errors.password && touched.password && errors.password}
                  </Form.Control.Feedback>
                </Input>

                <Button type="submit" variant="success" disabled={isSubmitting}>
                  {isSubmitting ? "Logando..." : "Login"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </>
  );
};
