import { object, ObjectSchema, string } from 'yup';
import { LoginProps } from '../../pages/user/Login';
import regex from '../constants/regex';

export const loginSchema: ObjectSchema<LoginProps> = object({
  email: string()
    .matches(regex.email, 'Digite um e-mail válido')
    .email('Digite um e-mail válido')
    .required('O campo e-mail é obrigatório'),
  password: string()
    .min(4, 'A senha deve ter no mínimo 4 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres')
    .required('Este campo é obrigatório'),
  // .matches(regex.password, 'Digite uma senha válida.'),
});
