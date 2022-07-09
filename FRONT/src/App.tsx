import React from 'react'
import './App.css';
import Login from './pages/Login';
import Dash from './pages/Dash';

import {
  BrowserRouter as Router,
  useRoutes
} from "react-router-dom";
import { AuthProvider } from './providers/auth';
import { CardsProvider } from './providers/cards';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  const routes = useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/dash', element: <Dash /> }
  ]);

  return routes;
}

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
  )
}

export default AppWrapper;
