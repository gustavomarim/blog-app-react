import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SweetAlert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { Title } from "../../../components/Title";
import _ from "../../../functions/_";
import { useCategory } from "../../../hooks/useCategory";
import { TIME_TO_SHOW_ALERT } from "../../../state/constants/timeToShowAlert";

export const AdminCategoryList = () => {
  const { data, error, isLoading, handleRemoveCategory } = useCategory();

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
      <Title>Lista de Categorias</Title>
      <hr />
      <Link to={"/admin/categories/add"}>
        <Button variant="success" className="mb-4">
          Nova categoria
        </Button>
      </Link>

      {data &&
        data.map(({ date, _id, name, slug }) => (
          <Card className="mb-4" key={_id}>
            <Card.Body>
              <h4>{name}</h4>
              <Card.Text>
                <small className="d-block">Slug: {slug}</small>
                <small>
                  Data de criação: {!!date && _.fd.formatDate(new Date(date))}
                </small>
              </Card.Text>

              <div className="d-flex gap-2">
                <Button type="button" variant="warning">
                  Editar
                </Button>

                <Button
                  type="button"
                  variant="danger"
                  onClick={() => handleRemoveCategory(!!_id ? _id : "")}
                >
                  Deletar
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};
