import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginDialog from './components/Login/LoginDilog';
import Registor from './components/Registor';
import Dashboard from './components/dashboard';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact Component={Registor} />
          <Route path='/login' exact Component={LoginDialog} />
          <Route path='/dashboard' exact Component={Dashboard } />
        </Routes>
      </Router>
    </>

  );
}

export default App;
