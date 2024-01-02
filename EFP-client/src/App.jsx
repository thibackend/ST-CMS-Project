import { useState } from 'react'
// import './App.css'
import AddProject from './components/AddProject/AddProject'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddProject></AddProject>
    </>
  )
}

export default App
