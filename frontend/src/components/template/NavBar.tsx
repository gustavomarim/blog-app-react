import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Link to='/' className='text-decoration-none'>
          <Navbar.Brand>Blog App</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Link to='/' className='text-decoration-none nav-link'>
              Home
            </Link>
            <Link to='/' className='text-decoration-none nav-link'>
              Categorias
            </Link>
            <Link to='/' className='text-decoration-none nav-link'>
              Login
            </Link>
            <Link to='/' className='text-decoration-none nav-link'>
              Registro
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
