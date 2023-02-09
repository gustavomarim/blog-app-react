import './App.css';
import { Container } from './components/layouts/Container';
import { Jumbotron } from './components/template/Jumbotron';
import { NavBar } from './components/template/NavBar';
import _ from './functions/_';

function App() {
  _.obj.isObject({});

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
