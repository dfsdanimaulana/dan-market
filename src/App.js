import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

// context
import { useAuthContext } from './hooks/useAuthContext'
// styles
import './App.css'

// pages
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'

// components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Profile from './components/Profile'
import Sell from './pages/sell/Sell'

function App() {
  const { user , authIsReady } = useAuthContext()
  
  return (
    <div className="App">
      {authIsReady && (
        <Router>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route  path="/" element={user ? <Dashboard/> : <Navigate to='/login'/> }/>
              <Route  path="/login" element={!user ? <Login /> : <Navigate to='/'/> }/>
              <Route  path="/signup" element={!user ? <Signup /> : <Navigate to='/'/> }/>
              <Route  path="/profile" element={user ? <Profile /> : <Navigate to='/login'/> }/>
              <Route  path="/sell" element={user ? <Sell /> : <Navigate to='/login'/> }/>
            </Routes>
          </div>
        </Router>
      )}
    </div>
  )
}

export default App
