import { object, ObjectSchema, string } from 'yup';
import { DataFormProps } from '../../pages/user/Register';
import regex from '../../state/constants/regex';

const registerSchema: ObjectSchema<DataFormProps> = object({
  name: string()
    .matches(
      regex.onlyCharacter,
      'Este campo não pode conter caracteres especiais e nem numéricos',
    )
    .min(3, 'Digite um nome válido')
    .max(80, 'Este campo pode conter no máximo 80 caracteres')
    .required('O campo nome é obrigatório'),
  email: string()
    .matches(regex.email, 'Digite um e-mail válido')
    .email('Digite um e-mail válido')
    .required('O campo e-mail é obrigatório'),
  password: string()
    .min(4, 'A senha deve ter no mínimo 4 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres')
    .required('Este campo é obrigatório'),
  // .matches(regex.password, 'Digite uma senha válida.'),
  confirmPassword: string()
    .required('Este campo é obrigatório')
    .test('passwords-match', 'As senhas precisam ser iguais', function (value) {
      return this.parent.password === value;
    }),
});

export default registerSchema;
