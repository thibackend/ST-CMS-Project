
import { BrowserRouter as Router} from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Auth';
import MainLayout from './layout';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  
  const handleLogin = () => {
  }
  return (
    <Router>
      {isLoggedIn? (
        <MainLayout />
      ) : (
        <Login />
      )}
    </Router>
  )
}

export default App