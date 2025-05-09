
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Setting from './pages/Setting.jsx'
import Profile from './pages/Profile.jsx'

import Navbar from './components/Navbar.jsx'
function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/setting" element={<Setting/>}/>

    </Routes>
    </>
  )
}

export default App
