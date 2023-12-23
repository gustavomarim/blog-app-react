import { BlogPostProps } from "../../types/blogPost";

export default class Post {
  private _props: BlogPostProps;

  constructor(props: BlogPostProps) {
    this._props = props;
  }
}
