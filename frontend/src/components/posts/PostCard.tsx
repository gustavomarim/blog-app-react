import { Card } from 'react-bootstrap';
import { PostProps } from '../../core/posts/Post';
import { ButtonComponent } from '../shared/Button';

export const PostCard = (props: PostProps) => {
  return (
    <>
      <Card className='mb-4'>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>

          <ButtonComponent type={'button'} size={'sm'} variant='primary'>
            Leia Mais
          </ButtonComponent>

          <hr />

          <p className='d-block'>Categoria: {props.category}</p>
          <p className='d-block'>Data de publicação: {'props.date'}</p>
        </Card.Body>
      </Card>
    </>
  );
};
