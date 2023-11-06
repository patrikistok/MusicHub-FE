import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./Layout";
import { Routes } from "./Routes";
import queryClient from "./queryClient";
import { QueryClientProvider } from "react-query";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
