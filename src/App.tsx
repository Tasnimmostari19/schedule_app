import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Users from './Components/Users/Users'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Appointments from './Components/Appoinments/Appoinments'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="pt-16">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/appointments" element={<Appointments />} />
        {/* <Route path="/create-appointment" element={<CreateAppointment />} /> */}
      </Routes>
      </div>
    </div>
  </Router>
  )
}

export default App
