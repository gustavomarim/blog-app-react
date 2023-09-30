import { AxiosResponse } from 'axios';
import { Formik } from 'formik';
import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AlertComponent } from '../../components/shared/Alert';
import { ButtonComponent } from '../../components/shared/Button';
import { Title } from '../../components/shared/Title';
import { Input } from '../../components/template/Input';
import api from '../../core/api/ApiService';
import registerSchema from '../../state/schema/registerSchema';

export interface DataFormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate: NavigateFunction = useNavigate();

  async function registerForm(dataForm: DataFormProps): Promise<void> {
    const { name, email, password, confirmPassword } = dataForm;
    setErrorMessage(null);
    setSuccessMessage(null);

    await api
      .post('/users/register', {
        name,
        email,
        password,
        confirmPassword,
      })
      .then((response: AxiosResponse<any, any>) => {
        if (response.status === 200) {
          setSuccessMessage('Cadastro realizado com sucesso!');
          redirectToHome(true);
        }
      })
      .catch((error: any) => {
        setErrorMessage(error.response.data);
      });
  }

  function redirectToHome(isRedirect: boolean): void {
    if (isRedirect)
      setTimeout(() => {
        navigate('/');
      }, 4000);
  }

  return (
    <>
      {successMessage && (
        <AlertComponent
          message={successMessage}
          variant={'success'}
          timeInMS={3000}
        />
      )}
      {errorMessage && (
        <AlertComponent
          message={errorMessage}
          variant={'danger'}
          timeInMS={3000}
        />
      )}
      <Title>Crie sua conta hoje:</Title>
      <Formik
        validationSchema={registerSchema}
        onSubmit={(values, { resetForm }) => {
          registerForm(values);
          resetForm();
        }}
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
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
                  label={'Nome'}
                  id={'name'}
                  type={'text'}
                  name={'name'}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.name && !errors.name}
                  isInvalid={!!errors.name}
                >
                  <Form.Control.Feedback type='invalid'>
                    {errors.name && touched.name && errors.name}
                  </Form.Control.Feedback>
                </Input>

                <Input
                  label={'Email'}
                  id={'email'}
                  type={'email'}
                  name={'email'}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                >
                  <Form.Control.Feedback type='invalid'>
                    {errors.email && touched.email && errors.email}
                  </Form.Control.Feedback>
                </Input>

                <Input
                  label={'Senha'}
                  id={'password'}
                  type={'password'}
                  name={'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                  aria-describedby={'passwordHelpBlock'}
                >
                  <Form.Text id='passwordHelpBlock' muted>
                    Sua senha deve ter de 8 a 20 caracteres, conter letras e
                    números, e não deve conter espaços, caracteres especiais,
                    personagens ou emojis.
                  </Form.Text>
                  <Form.Control.Feedback type='invalid'>
                    {errors.password && touched.password && errors.password}
                  </Form.Control.Feedback>
                </Input>

                <Input
                  label={'Redigite a Senha'}
                  id={'confirmPassword'}
                  type={'password'}
                  name={'confirmPassword'}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={!!errors.confirmPassword}
                >
                  <Form.Control.Feedback type='invalid'>
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                  </Form.Control.Feedback>
                </Input>

                <ButtonComponent
                  type='submit'
                  variant='success'
                >
                  Registrar
                </ButtonComponent>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </>
  );
};
