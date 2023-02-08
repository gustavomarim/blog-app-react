import './App.css';
import { Container } from './components/Container';
import { Jumbotron } from './components/Jumbotron';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Container>
        <Jumbotron />
      </Container>
    </div>
  );
}

export default App;
