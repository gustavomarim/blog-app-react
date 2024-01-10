import { Button, Card } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Icon } from "../../../../components/Icon";
import { Title } from "../../../../components/Title";
import api from "../../../../core/api/ApiService";
import _ from "../../../../functions/_";
import { BlogPostProps } from "../../../../types/blogPost";

const getAllPosts = async () => {
  try {
    const response = await api.get<BlogPostProps[]>("/admin/posts", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar postagens: ${error}`);
    throw Error;
  }
};

export const AdminPostList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: "adminGetAllPosts",
    queryFn: getAllPosts,
  });
  console.log("data", data);

  if (isLoading) return <p>Carregando...</p>;

  if (error) return null;

  return (
    <>
      <Title>Lista de Postagens</Title>
      <hr />

      <Link to={""}>
        <Button
          variant="success"
          className="mb-4 d-flex justify-content-center align-items-center gap-1"
        >
          <Icon iconName="PlusLg" />
          Nova Postagem
        </Button>
      </Link>

      {data &&
        data.map((post) => (
          <Card className="mb-3" key={post._id}>
            <Card.Body>
              <h4>{post.title}</h4>
              <Card.Text>Descrição: {post.description}</Card.Text>
              <Card.Text>Conteúdo: {post.content}</Card.Text>
              <Card.Text>
                <small className="d-block">
                  Postagem: {_.fd.formatDate(new Date(post.date))}
                </small>
                <small className="d-block">
                  Categoria: {post.category.name}
                </small>
              </Card.Text>
              <div className="d-flex align-items-center gap-2">
                <Link to={`/admin/posts/${post._id}`}>
                  <Button
                    variant="warning"
                    className="d-flex justify-content-center align-items-center gap-1"
                  >
                    Editar <Icon iconName="PencilFill" />
                  </Button>
                </Link>

                <Button
                  variant="danger"
                  className="d-flex justify-content-center align-items-center gap-1"
                >
                  Excluir <Icon iconName="TrashFill" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};
