import { Formik } from "formik";
import { Card, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { SweetAlert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import api from "../../core/api/ApiService";
import { loginSchema } from "../../state/schema/loginSchema";

export interface LoginProps {
  email: string;
  password: string;
}

interface LoginError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export const Login = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation((dataForm: LoginProps) => {
    const { email, password } = dataForm;

    return api.post("/users/login", { email, password });
  });

  const handleSubmit = async (values: LoginProps) => {
    try {
      await loginMutation.mutateAsync(values);
      redirectToHome(true);
    } catch (error: any) {
      console.error(error);
    }
  };

  const redirectToHome = (isRedirect: boolean) => {
    const FOUR_SECONDS_WAIT_TO_REDIRECT = 4000;

    if (!isRedirect) return;

    setTimeout(() => {
      navigate("/");
    }, FOUR_SECONDS_WAIT_TO_REDIRECT);
  };

  return (
    <>
      {console.log(loginMutation)}
      {loginMutation.isSuccess && (
        <SweetAlert
          message={loginMutation.data.data.message}
          variant="success"
          timeInMS={3000}
        />
      )}

      {loginMutation.isError && loginMutation.error && (
        <SweetAlert
          message={
            (loginMutation.error as LoginError)?.response?.data?.error ||
            "Erro ao realizar login"
          }
          variant="danger"
          timeInMS={3000}
        />
      )}

      <Title>Login:</Title>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
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
