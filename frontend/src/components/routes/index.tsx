import { Route, Routes } from 'react-router-dom';
import { Category } from '../../pages/category';
import { PostByCategory } from '../../pages/category/PostByCategory';
import { Home } from '../../pages/home/index.';
import { Post } from '../../pages/post';
import { Login } from '../../pages/user/Login';
import { Register } from '../../pages/user/Register';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path={'/posts/:slug'} element={<Post />} />
      <Route path='/categories' element={<Category />} />
      <Route path='/categories/:slug' element={<PostByCategory />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default RoutesComponent;
