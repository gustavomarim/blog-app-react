import { Route, Routes } from "react-router-dom";
import { AdminCategoryList } from "../pages/admin/categoryList";
import { Category } from "../pages/category";
import { Home } from "../pages/home/index";
import { Login } from "../pages/login";
import PageNotFound from "../pages/pageNotFound";
import { Post } from "../pages/post";
import { PostByCategory } from "../pages/postByCategory";
import { Register } from "../pages/register";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={"/posts/:slug"} element={<Post />} />
      <Route path="/categories" element={<Category />} />
      <Route path="/categories/:slug" element={<PostByCategory />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />

      {/* ...::: ADMIN :::... */}
      <Route path="/admin/categories" element={<AdminCategoryList />} />
    </Routes>
  );
};

export default RoutesComponent;
