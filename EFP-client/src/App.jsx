
import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Auth';
import MainLayout from './layout';


function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  )
}

export default App