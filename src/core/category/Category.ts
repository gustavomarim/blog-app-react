export interface CategoryProps {
  id: string;
  date: string;
  name: string;
  slug: string;
}

export default class Category {
  private _props: CategoryProps;

  constructor(props: CategoryProps) {
    this._props = props;
  }
}
