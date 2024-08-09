import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import MyProjects from './pages/my-projects';
import ProjectList from './pages/project-list';
import NavBar from './components/nav-bar';

function App() {
  return (
    <>
      <Router>
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
            <Route path="/my-projects" element={<MyProjects />} />
          </Route>
        </Routes>
      </Router >
    </>
  );
}

export default App;
