import { Container } from 'react-bootstrap';
import './App.css';
import { NavBar } from './components/NavBar';
import RoutesComponent from './routes';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Container>
        <RoutesComponent />
      </Container>
    </div>
  );
}

export default App;
