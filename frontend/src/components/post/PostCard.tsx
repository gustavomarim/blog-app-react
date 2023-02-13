import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PostProps } from '../../core/posts/Post';
import _ from '../../functions/_';
import { ButtonComponent } from '../shared/Button';

export const PostCard = (props: PostProps) => {
  return (
    <>
      <Card className='mb-4'>
        <Card.Body>
          <h3>{props.title}</h3>
          <Card.Text>{props.description}</Card.Text>

          <Link to={`/posts/${props.slug}`} >
            <ButtonComponent type={'button'} size={'sm'} variant='primary'>
              Leia Mais
            </ButtonComponent>
          </Link>

          <hr />
          <small className='d-block'>{`Categoria: ${props.category.name}`}</small>

          <small className='d-block'>{`Data da postagem: ${_.fd.formatDate(
            props.date,
          )}`}</small>
        </Card.Body>
      </Card>
    </>
  );
};
