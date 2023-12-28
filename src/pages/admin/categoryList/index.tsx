import { Card } from "react-bootstrap";
import { SweetAlert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { Title } from "../../../components/Title";
import _ from "../../../functions/_";
import { useCategory } from "../../../hooks/useCategory";
import { TIME_TO_SHOW_ALERT } from "../../../state/constants/timeToShowAlert";

export const AdminCategoryList = () => {
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
      <Title>Lista de Categorias</Title>
      <hr />
      <Button variant="success" className="mb-4">
        Nova categoria
      </Button>

      {data &&
        data.map(({ date, id, name, slug }) => (
          <Card className="mb-4" key={id}>
            <Card.Body>
              <h4>{name}</h4>
              <Card.Text>
                <small className="d-block">Slug: {slug}</small>
                <small>
                  Data de criação: {_.fd.formatDate(new Date(date))}
                </small>
              </Card.Text>

              <div className="d-flex gap-2">
                <Button type="button" variant="warning">
                  Editar
                </Button>
                <Button type="button" variant="danger">
                  Deletar
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};
