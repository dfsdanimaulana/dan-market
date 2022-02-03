import { Link } from 'react-router-dom'

// hooks
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'

// styles
import './Navbar.css'

// icons
import Temple from '../assets/icons/temple.svg'
import Cart from '../assets/icons/cart.svg'

export default function Navbar() {
  const { user } = useAuthContext()
  const { documents } = useCollection('carts', ['uid', '==', user.uid])

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="logo" />
          <span>Dan Market</span>
        </li>

        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        ) : (
          <>
            <li className="">
              <Link to="/cart">
                <img src={Cart} alt="logo" />
                {documents && <span>{documents.length}</span>}
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
