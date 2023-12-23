import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import _ from "../../functions/_";
import { BlogPostProps } from "../../types/blogPost";
import { Button } from "../Button";

export const PostCard = (props: BlogPostProps) => {
  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <h3>{props.title}</h3>
          <Card.Text>{props.description}</Card.Text>

          <Button type="button" size="sm" variant="primary">
            <Link to={`/posts/${props.slug}`}>Leia Mais</Link>
          </Button>

          <hr />
          <small className="d-block">{`Categoria: ${props.category.name}`}</small>

          <small className="d-block">{`Data da postagem: ${_.fd.formatDate(
            props.date
          )}`}</small>
        </Card.Body>
      </Card>
    </>
  );
};
