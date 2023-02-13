import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../core/api/ApiService';
import { CategoryProps } from '../../core/category/Category';
import { TagIcon } from '../icons';
import { Title } from '../shared/Title';

export const Category = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  async function allCategories(): Promise<void> {
    const response = await api.get('/categories');
    const data = response.data;
    setCategories(data);
  }

  useEffect(() => {
    allCategories();
  }, []);

  return (
    <>
      <Title>Categorias:</Title>
      <ListGroup>
        {categories.map(({ name, slug }) => (
          <ListGroup.Item action className='d-flex' key={name}>
            <Link to={`/categories/${slug}`}>
              {TagIcon(5)}
              {name}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
