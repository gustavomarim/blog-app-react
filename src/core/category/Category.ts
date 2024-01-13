import { CategoryProps } from "../../types/category";

export default class Category {
  private _props: CategoryProps | CategoryProps[];

  constructor(props: CategoryProps | CategoryProps[]) {
    this._props = props;
  }

  findCategoryById(id: string) {
    if (!Array.isArray(this._props)) return;
    return this._props.find((category) => category._id?.includes(id));
  }
}
