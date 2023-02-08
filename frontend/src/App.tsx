import './App.css';
import { Jumbotron } from './components/Jumbotron';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className='App'>
      <NavBar />

      {/* Transformar essa div em um componente Container */}
      <div className='container mt-4'>
        <Jumbotron />
      </div>
    </div>
  );
}

export default App;
