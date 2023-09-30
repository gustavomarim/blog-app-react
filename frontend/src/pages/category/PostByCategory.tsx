import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ButtonComponent } from "../../components/shared/Button";
import { Title } from "../../components/shared/Title";
import api from "../../core/api/ApiService";
import { CategoryProps } from "../../core/category/Category";
import { PostProps } from "../../core/posts/Post";
import _ from "../../functions/_";

export const PostByCategory = () => {
  const [post, setPost] = useState<PostProps[]>([]);
  const [category, setCategory] = useState<CategoryProps>();
  const params = useParams();
  const slug = params.slug ?? "";

  async function getPostByCategory(slug: string): Promise<void> {
    const response = await api.get(`/categories/${slug}`);
    const { data } = response;
    setPost(data);
  }

  async function getCategoryBySlug(slug: string): Promise<void> {
    const response = await api.get(`/category/${slug}`);
    const { data } = response;
    setCategory(data);
  }

  useEffect(() => {
    if (_.str.isString(slug)) getPostByCategory(slug);
  }, []);

  useEffect(() => {
    if (_.str.isString(slug)) getCategoryBySlug(slug);
  }, []);

  if (post && post.length > 0)
    return (
      <>
        {category ? <Title>{category.name}</Title> : ""}
        {post.map((post) => (
          <Card className="mb-4" key={post.title}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.description}</Card.Text>
              <ButtonComponent variant="primary" type="button">
                <Link to={`/posts/${post.slug}`}>Leia Mais</Link>
              </ButtonComponent>
              <hr />
              <small className="d-block">
                {`Data de publicação: ${_.fd.formatDate(post.date)}`}
              </small>
            </Card.Body>
          </Card>
        ))}
      </>
    );

  return (
    <>
      <Title>{category ? category.name : ""}</Title>
      <p>Não há postagens desta categoria.</p>
    </>
  );
};
