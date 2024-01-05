import { Container } from "react-bootstrap";
import { QueryClientProvider } from "react-query";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./contexts/AuthContext";
import { queryClient } from "./core/api/queryClient";
import RoutesComponent from "./routes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="App">
          <NavBar />
          <Container>
            <RoutesComponent />
          </Container>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
