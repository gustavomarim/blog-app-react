import { Formik } from "formik";
import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { AlertComponent } from "../../components/shared/Alert";
import { ButtonComponent } from "../../components/shared/Button";
import { Title } from "../../components/shared/Title";
import api from "../../core/api/ApiService";
import { loginSchema } from "../../state/schema/loginSchema";

export interface LoginProps {
  email: string;
  password: string;
}

export const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const navigate: NavigateFunction = useNavigate();

  async function login(dataForm: LoginProps): Promise<void> {
    const { email, password } = dataForm;
    setErrorMessage(null);
    setResponseMessage(null);

    await api
      .post("/users/login", {
        email,
        password,
      })
      .then(() => {
        setResponseMessage("Login realizado com sucesso!");
        redirectToHome(true);
      })
      .catch((err: any) => setErrorMessage(err.response.data.error));
  }

  function redirectToHome(isRedirect: boolean): void {
    if (isRedirect)
      setTimeout(() => {
        navigate("/");
      }, 4000);
  }

  return (
    <>
      {responseMessage ? (
        <AlertComponent
          message={responseMessage}
          variant="success"
          timeInMS={3000}
        />
      ) : (
        ""
      )}
      {errorMessage ? (
        <AlertComponent
          message={errorMessage}
          variant="danger"
          timeInMS={3000}
        />
      ) : (
        ""
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

                <ButtonComponent
                  type="submit"
                  variant="success"
                  disabled={isSubmitting}
                >
                  Login
                </ButtonComponent>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </>
  );
};
