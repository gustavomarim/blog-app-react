export interface UserProps {
  id: string;
  name: string;
  email: string;
}

export default class User {
  private _props: UserProps;

  constructor(props: UserProps) {
    this._props = props;
  }

  // Funcionalidades, validações...
}
