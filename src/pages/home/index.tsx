import { useEffect, useState } from "react";
import { Jumbotron } from "../../components/Jumbotron";
import { PostCard } from "../../components/PostCard";
import { Title } from "../../components/Title";
import api from "../../core/api/ApiService";
import { BlogPostProps } from "../../types/blogPost";

export const Home = () => {
  const [posts, setPosts] = useState<BlogPostProps[]>([]);

  useEffect(() => {
    async function getAllPosts() {
      const response = await api.get("/");
      const { data } = response;
      setPosts(data);
    }

    getAllPosts();
  }, []);

  return (
    <>
      <Jumbotron />

      <hr />

      <Title>Postagens Recentes:</Title>
      {posts.map(
        ({ _id, title, slug, description, content, category, date }) => (
          <PostCard
            key={_id}
            title={title}
            slug={slug}
            description={description}
            content={content}
            category={category}
            date={date}
            _id={_id}
          />
        )
      )}
    </>
  );
};
