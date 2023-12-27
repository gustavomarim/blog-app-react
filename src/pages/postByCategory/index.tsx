import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Title } from "../../components/Title";
import api from "../../core/api/ApiService";
import _ from "../../functions/_";
import { BlogPostProps } from "../../types/blogPost";
import { CategoryProps } from "../../types/category";

export const PostByCategory = () => {
  const [post, setPost] = useState<BlogPostProps[]>([]);
  const [category, setCategory] = useState<CategoryProps>();
  const params = useParams();
  const slug = params.slug ?? "";

  async function getPostByCategory(slug: string): Promise<void> {
    const response = await api.get(`/categories/${slug}`);
    const { data } = response;
    setPost(data);
  }

  useEffect(() => {
    if (_.str.isString(slug)) getPostByCategory(slug);
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
              <Button variant="primary" type="button">
                <Link to={`/posts/${post.slug}`}>Leia Mais</Link>
              </Button>
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
