import _ from '../../functions/_';
import regex from '../../state/constants/regex';
import { UserProps } from '../../types/user';

type FieldName = 'name' | 'email' | 'password';
type Field = {
  [key: string]: () => boolean;
};

export default class User {
  private _props: UserProps;

  constructor(props: UserProps) {
    this._props = props;
  }

  // Funcionalidades, validações...
  validate(fieldName: FieldName): boolean {
    const field: Field = {
      name: () => regex.onlyCharacter.test(this._props.name),
      email: () => regex.email.test(this._props.email),
      password: () => regex.password.test(this._props.password),
    };

    if (_.str.isString(fieldName)) {
      return field[fieldName]();
    }

    return false;
  }
}
