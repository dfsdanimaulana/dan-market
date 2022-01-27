import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

// context
import { useAuthContext } from './hooks/useAuthContext'
// styles
import './App.css'

// pages
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import Sell from './pages/sell/Sell'
import Cart from './pages/cart/Cart'
import CardDetails from './pages/details/CardDetails'

// components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Profile from './components/Profile'

function App() {
  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
                path="/sell"
                element={user ? <Sell /> : <Navigate to="/login" />}
              />
              <Route
                path="/cart"
                element={user ? <Cart /> : <Navigate to="/login" />}
              />
              <Route
                path="/details/:id"
                element={user ? <CardDetails /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  )
}

export default App
