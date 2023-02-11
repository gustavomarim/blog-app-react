import { Card } from 'react-bootstrap';
import { PostProps } from '../../core/posts/Post';
import _ from '../../functions/_';
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
          <small className='d-block'>{`Categoria: ${props.category.name}`}</small>

          <small className='d-block'>{`Data da postagem: ${_.fd.formatDate(props.date)}`}</small>
        </Card.Body>
      </Card>
    </>
  );
};
