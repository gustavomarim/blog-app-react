import { useEffect, useState } from 'react';
import api from '../../core/api/ApiService';
import { PostProps } from '../../core/posts/Post';
import { Jumbotron } from '../template/Jumbotron';
import { PostCard } from './PostCard';

export const Home = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    async function getAllPosts() {
      const response = await api.get('/');
      const { data } = response;
      setPosts(data);
    }

    getAllPosts();
  }, []);

  return (
    <>
      <Jumbotron />

      <hr />

      <h2 className='my-4'>Postagens Recentes:</h2>
      {posts.map(({ title, slug, description, content, category, date }) => (
        <PostCard
          key={title}
          title={title}
          slug={slug}
          description={description}
          content={content}
          category={category}
          date={date}
        />
      ))}
    </>
  );
};
