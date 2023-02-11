import './App.css';
import { Container } from './components/layouts/Container';
import RoutesComponent from './components/routes/index';
import { NavBar } from './components/template/NavBar';

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
