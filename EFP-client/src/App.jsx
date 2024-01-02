import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './route'
import { Layout } from 'antd'
import Navbar from './components/Navbar/Navbar';
import AvatarComponent from './components/Avatar/Avatar';
const { Header, Content } = Layout;

function App() {

  return (
    <Router>
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
    </Router>
  )
}

export default App
