import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { SweetAlert } from "../../components/Alert";
import { Title } from "../../components/Title";
import _ from "../../functions/_";
import { useCategory } from "../../hooks/useCategory";
import { usePostByCategory } from "../../hooks/usePostByCategory";
import { TIME_TO_SHOW_ALERT } from "../../state/constants/timeToShowAlert";
import { CategoryProps } from "../../types/category";

export const PostByCategory = () => {
  const [category, setCategory] = useState<CategoryProps>();
  const params = useParams();
  const slug = params.slug || "";
  const { data, error, isLoading } = usePostByCategory(`/categories/${slug}`);
  const { getCategory } = useCategory();

  useEffect(() => {
    const fetchCategoryBySlug = async () => {
      try {
        const category = await getCategory(slug);
        setCategory(category);
      } catch (error) {
        console.error(`Erro ao fazer a requisição da categoria: ${slug}`);
      }
    };

    fetchCategoryBySlug();
  }, [slug]);

  if (isLoading) <p>Carregando...</p>;

  if (error) {
    console.error(`Erro ao carregar as postagens por categoria: ${error}`);
    <SweetAlert
      message={`Erro ao carregar as postagens por categoria: ${error}`}
      variant="warning"
      timeInMS={TIME_TO_SHOW_ALERT}
    />;
  }

  if (data?.length === 0 && category) {
    return (
      <>
        <Title>{category.name}</Title>
        <p>Não há postagens desta categoria.</p>
      </>
    );
  }

  return (
    <>
      {category && <Title>{category.name}</Title>}
      {data &&
        data.map(({ title, description, slug, date }) => (
          <Card className="mb-4" key={title}>
            <Card.Body>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{description}</Card.Text>
              <Button variant="primary" type="button">
                <Link to={`/posts/${slug}`}>Leia Mais</Link>
              </Button>
              <hr />
              <small className="d-block">
                {`Data de publicação: ${_.fd.formatDate(date)}`}
              </small>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};
