import { Suspense, lazy } from 'react';
import './App.css';
import PrivateRoute from '../components/PrivateRoute';

import {
  ItemsEndpoint,
  LoginEndpoint,
  RegistrationEndpoint,
  CreateNewItemEndpoint,
  DepositEndpoint,
} from '../configs/endpoints';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const LoginPage = lazy(() => import('../components/Authentication/LoginPage'));

const RegistrationPage = lazy(
  () => import('../components/Authentication/RegistrationPage'),
);
const HomePage = lazy(() => import('../components/Bidding/HomePage'));
const NewItemPage = lazy(() => import('../components/Bidding/NewItemPage'));
const DepositPage = lazy(() => import('../components/Deposit/DepositPage'));

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
                  <HomePage />
                </PrivateRoute>
              }></Route>
            <Route
              path={CreateNewItemEndpoint}
              element={
                <PrivateRoute>
                  <NewItemPage />
                </PrivateRoute>
              }></Route>
            <Route
              path={DepositEndpoint}
              element={
                <PrivateRoute>
                  <DepositPage />
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
