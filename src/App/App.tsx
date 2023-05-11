import { Suspense, lazy } from 'react';
import './App.css';
import PrivateRoute from '../components/PrivateRoute';

import {
  ItemsEndpoint,
  LoginEndpoint,
  RegistrationEndpoint,
} from '../configs/endpoints';

import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const LoginPage = lazy(()=> import('../components/Authentication/LoginPage'));
const RegistrationPage = lazy(()=> import('../components/Authentication/RegistrationPage'));
const ItemsPage = lazy(()=> import('../components/Bidding/ItemsPage'))

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path={ItemsEndpoint}
              element={
                <PrivateRoute>
                  <ItemsPage />
                </PrivateRoute>
              }></Route>
            <Route path={LoginEndpoint} element={<LoginPage />}></Route>
            <Route
              path={RegistrationEndpoint}
              element={<RegistrationPage />}></Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
