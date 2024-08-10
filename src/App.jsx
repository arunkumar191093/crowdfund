import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import MyProjects from './pages/my-projects';
import ProjectList from './pages/project-list';
import LoginPage from './pages/login';
import SignUpPage from './pages/sign-up';
import NavBar from './components/nav-bar';
import ErrorPage from './pages/error-page';
import AuthValidator from './components/auth-validator';
import { AuthContextProvider, AuthContext } from './context/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  console.log('authCtx in App', authCtx)
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route
            element={(
              <>
                <NavBar />
                <Outlet />
              </>
            )}
          >
            <Route path="/" element={<ProjectList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/not-authorised" element={<ErrorPage />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/my-projects" element={
              <AuthValidator>
                <MyProjects />
              </AuthValidator>
            } />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextProvider>
    </Router >
  );
}

export default App;
