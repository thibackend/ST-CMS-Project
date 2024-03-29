
import { useEffect, useState } from 'react';
import MainLayout from './layout';
import Auth from './services/auth';
import AuthRoute from './Routers/AuthRoute';

function App() {
  const auth = Auth(); // Directly call Auth as a component to use hooks
  return (
    auth && auth.st ?
      <MainLayout handleCookieDataAdmin={auth && auth.handleCookieDataAdmin} />
      :
      <AuthRoute handleCookieDataAdmin={auth && auth.handleCookieDataAdmin} />
  )
}

export default App