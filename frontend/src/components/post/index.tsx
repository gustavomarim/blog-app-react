import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../../core/api/ApiService';
import { PostProps } from '../../core/posts/Post';
import _ from '../../functions/_';

export const Post = () => {
  const [post, setPost] = useState<PostProps>();
  const params = useParams();
  const slug = params.slug;

  async function getPost(slug: string) {
    const response = await api.get(`/posts/${slug}`);
    const data = response.data;
    setPost(data);
  }

  useEffect(() => {
    if (typeof slug === 'string') getPost(slug);
  }, []);

  if (post)
    return (
      <Card>
        <Card.Body>
          <h1>{post.title}</h1>
          <hr />
          <small className='d-block'>
            {`Data da publicação: ${_.fd.formatDate(post.date)}`}
          </small>
          <hr />
          <Card.Text>{post.content}</Card.Text>
        </Card.Body>
      </Card>
    );

  return null;
};
