import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SweetAlert } from "../../components/Alert";
import { TagIcon } from "../../components/Icons";
import { Title } from "../../components/Title";
import { useCategory } from "../../hooks/useCategory";
import { TIME_TO_SHOW_ALERT } from "../../state/constants/timeToShowAlert";

export const Category = () => {
  const { data, error, isLoading } = useCategory();

  if (isLoading) <p>Carregando...</p>;

  if (error) {
    console.error("Erro ao carregar categorias:", error);
    <SweetAlert
      message={`Erro ao carregar categorias::: ${error}`}
      timeInMS={TIME_TO_SHOW_ALERT}
      variant="warning"
    />;
  }

  return (
    <>
      <Title>Categorias:</Title>
      <ListGroup>
        {data &&
          data.map(({ id, name, slug }) => (
            <ListGroup.Item action className="d-flex" key={id}>
              <Link to={`/categories/${slug}`}>
                {TagIcon(5)}
                {name}
              </Link>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};
