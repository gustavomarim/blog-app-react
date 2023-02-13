import { CategoryProps } from '../category/Category';

export interface PostProps {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: CategoryProps;
  date: Date;
}

export default class Post {
  private _props: PostProps;

  constructor(props: PostProps) {
    this._props = props;
  }
}
