import "./App.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dash from "./pages/Dash";
import Login from "./pages/Login";
import { AuthProvider } from "./providers/auth";
import { CardsProvider } from "./providers/cards";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const routes = useRoutes([
    { path: "/login", element: <Login /> },
    { path: "/dash", element: <Dash /> },
  ]);

  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <AuthProvider>
        <CardsProvider>
          <App />
          <ToastContainer />
        </CardsProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppWrapper;
