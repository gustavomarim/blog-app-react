import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import api from '../../core/api/ApiService';
import { CategoryProps } from '../../core/category/Category';
import { PostProps } from '../../core/posts/Post';
import _ from '../../functions/_';
import { ButtonComponent } from '../shared/Button';
import { Title } from '../shared/Title';

export const PostByCategory = () => {
  const [post, setPost] = useState<PostProps[]>([]);
  const [category, setCategory] = useState<any>('');
  const params = useParams();
  const slug = params.slug;

  async function getPostByCategory(slug: string): Promise<void> {
    const response = await api.get(`/categories/${slug}`);
    const data = response.data;
    setPost(data);
  }

  async function getCategoryBySlug(slug: string): Promise<void> {
    const response = await api.get(`/category/${slug}`);
    const data: CategoryProps = response.data;
    setCategory(data);
  }

  useEffect(() => {
    if (typeof slug === 'string') getPostByCategory(slug);
  }, []);

  useEffect(() => {
    if (typeof slug === 'string') getCategoryBySlug(slug);
  }, []);

  if (post && post.length > 0)
    return (
      <>
        <Title>{category.name}</Title>
        {post.map((post) => (
          <Card className='mb-4' key={post.title}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.description}</Card.Text>
              <Link to={`/posts/${post.slug}`}>
                <ButtonComponent
                  variant='primary'
                  type='button'
                  size={undefined}
                >
                  Leia Mais
                </ButtonComponent>
              </Link>
              <hr />
              <small className='d-block'>
                {`Data de publicação: ${_.fd.formatDate(post.date)}`}
              </small>
            </Card.Body>
          </Card>
        ))}
      </>
    );

  return (
    <>
      <Title>{category.name}</Title>
      <p>Não há postagens desta categoria.</p>
    </>
  );
};
