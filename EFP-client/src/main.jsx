import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './components/i18n/index.jsx'
import './index.css';
import './components/i18n/index.jsx';
import '../src/components/i18n';
// import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
      <Suspense fallback={(<div>Loading</div>)}>
        <App />
      </Suspense>
    </React.StrictMode>
  </Router>
)
