import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SweetAlert } from "../../../../components/Alert";
import { Button } from "../../../../components/Button";
import { Title } from "../../../../components/Title";
import _ from "../../../../functions/_";
import { useGetAllCategories } from "../../../../hooks/admin/useGetAllCategories";
import { useCategory } from "../../../../hooks/useCategory";
import { TIME_TO_SHOW_ALERT } from "../../../../state/constants/timeToShowAlert";
import { RequestErrorProps } from "../../../../types/requestError";

export const AdminCategoryList = () => {
  const { handleRemoveCategory } = useCategory();
  const { data, error, isLoading } = useGetAllCategories();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    console.error("Erro ao carregar categorias:", error);
    setTimeout(() => {
      navigate("/login");
    }, 4000);

    return (
      <SweetAlert
        message={`Erro ao carregar categorias: ${
          (error as RequestErrorProps)?.response?.data?.error ||
          "Erro desconhecido"
        }`}
        timeInMS={TIME_TO_SHOW_ALERT}
        variant="danger"
      />
    );
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
                <Link to={`/admin/categories/edit/${_id}`}>
                  <Button type="button" variant="warning">
                    Editar
                  </Button>
                </Link>

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
