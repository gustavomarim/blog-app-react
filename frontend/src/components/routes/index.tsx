import { Route, Routes } from 'react-router-dom';
import { Category } from '../category';
import { PostByCategory } from '../category/PostByCategory';
import { Home } from '../home/index.';
import { Post } from '../post';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<Home />} path='/' />
      <Route element={<Post />} path={`/posts/:slug`} />
      <Route element={<Category />} path='/categories' />
      <Route element={<PostByCategory />} path='/categories/:slug' />
    </Routes>
  );
};

export default RoutesComponent;
