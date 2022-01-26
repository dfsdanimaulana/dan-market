import { NavLink, useNavigate } from 'react-router-dom'

// context
import { useAuthContext } from '../hooks/useAuthContext'

// pages
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Avatar from './Avatar'

// styles
import './Sidebar.css'

export default function Sidebar() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* user  Avatar*/}
        <div className="user" onClick={() => navigate('/profile')}>
          <Avatar src={user.photoURL} />
          <p>Hey, {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/sell">
                <img src={AddIcon} alt="dashboard icon" />
                <span>Sell</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
