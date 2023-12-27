import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { SweetAlert } from "../../components/Alert";
import _ from "../../functions/_";
import { useBlogPost } from "../../hooks/usePost";
import { TIME_TO_SHOW_ALERT } from "../../state/constants/timeToShowAlert";

export const Post = () => {
  const params = useParams();
  const slug = params.slug;
  const { data, error, isLoading } = useBlogPost(`/posts/${slug}`);
  const formattedDate = data ? _.fd.formatDate(data?.date) : "";

  if (isLoading) <p>Carregando...</p>;

  if (error) {
    console.error(`Erro ao carregar postagens: ${error}`);
    return (
      <SweetAlert
        message={`Erro ao carregar postagens::: ${error}`}
        timeInMS={TIME_TO_SHOW_ALERT}
        variant="warning"
      />
    );
  }

  return (
    <>
      {data && (
        <Card>
          <Card.Body>
            <h1>{data.title}</h1>
            <hr />
            <small className="d-block">
              {`Data da publicação: ${formattedDate}`}
            </small>
            <hr />
            <Card.Text>{data.content}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};
