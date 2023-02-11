import { Route, Routes } from 'react-router-dom';
import { Home } from '../home/index.';
import { Post } from '../post';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route element={<Home />} path='/' />
      <Route element={<Post />} path={`/posts/:slug`} />
    </Routes>
  );
};

export default RoutesComponent;
