
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Setting from './pages/Setting.jsx'
import Profile from './pages/Profile.jsx'
import { useEffect } from 'react'
import {useAuthStore} from './store/AuthStore.js'
import {Loader} from 'lucide-react'

import Navbar from './components/Navbar.jsx'
function App() {
    const {authUser,checkAuth,isCheckingAuth} =useAuthStore();

    useEffect(()=>{
      checkAuth()
    },[checkAuth])
    console.log({authUser});
    if(isCheckingAuth && !authUser) return(
      <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
      </div>
    )
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={authUser?<Home/>:<Navigate to="/login"/>}/>
      <Route path="/signup" element={!authUser?<Signup/>:<Navigate to="/login"/>}/>
      <Route path="/login" element={!authUser?<Login/>:<Navigate to="/login"/>}/>
      <Route path="/profile" element={authUser?<Profile/> :<Navigate to="/login"/>}/>
      <Route path="/setting" element={<Setting/>}/>

    </Routes>
    </>
  )
}

export default App
