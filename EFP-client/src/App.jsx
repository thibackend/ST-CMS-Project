

import { useEffect, useState } from 'react';
import Login from './pages/Auth';
import MainLayout from './layout';
import Auth from './services/auth';

function App() {
  const auth = Auth(); // Directly call Auth as a component to use hooks
  return (
    auth && auth.st ? (
      <MainLayout setDataAdmin={auth && auth.setDataAdmin} />
    ) : (
      <Login setDataAdmin={auth && auth.setDataAdmin} />
    )
  )
  return <h1>Hello</h1>
}

export default App