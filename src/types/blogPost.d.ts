export type BlogPostProps = {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: CategoryProps;
  date: Date;
};
