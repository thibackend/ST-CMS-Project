
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Auth';
import MainLayout from './layout';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const handleLogin = (value) => {
    setIsLoggedIn(value)
  }
  useEffect(()=>{
    console.log(isLoggedIn);
  },[isLoggedIn])

  return (
    <Router>
      {isLoggedIn ? (
        <MainLayout handleLogin={handleLogin} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </Router>
  )
}

export default App