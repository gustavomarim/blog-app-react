import { CategoryProps } from "../../types/category";

export default class Category {
  private _props: CategoryProps;

  constructor(props: CategoryProps) {
    this._props = props;
  }
}
