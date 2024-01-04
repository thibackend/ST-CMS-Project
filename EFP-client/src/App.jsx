
import { BrowserRouter as Router} from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Auth';
import MainLayout from './layout';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const handleLogin = (value) => {
    setIsLoggedIn(value)
  }
  
  return (
    <Router>
      {isLoggedIn? (
        <MainLayout />
      ) : (
        <Login handleLogin = {handleLogin} />
      )}
    </Router>
  )
}

export default App