

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './route'
import { Layout } from 'antd'
import Navbar from './components/Navbar/Navbar';
import AvatarComponent from './components/Avatar/Avatar';
import { useState } from 'react';
import Login from './pages/Auth/Login';
const { Header, Content } = Layout;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const handleLogin = () => {

  }
  return (
    <Router>
      {isLoggedIn? (
      <Layout style={{ minHeight: '100vh', maxWidth: '100%' }}>
        <Navbar />
        <Layout>
          <Header style={{ background: '#006df0', textAlign:'end'}}>
            <AvatarComponent />
          </Header>
          <Content>
            <Routes>
              {routes.Routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            </Routes>
          </Content>
        </Layout>
      </Layout>
      ) : (
        <Login />
      )}
    </Router>
  )
}

export default App