import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirestore } from '../hooks/useFirestore'
import { useAuthContext } from '../hooks/useAuthContext'

// icons
import CartAdd from '../assets/icons/cartAdd.svg'
import CartRemove from '../assets/icons/cartRemove.svg'

// styles
import './Card.css'

export default function Card({ item, cartId }) {
  const { user } = useAuthContext()
  const { addDocument, deleteDocument } = useFirestore('carts')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const addToCart = async () => {
    const cartItems = {
      uid: user.uid,
      item,
    }
    try {
      await addDocument(cartItems)
    } catch (err) {
      setError(err.message)
    }
  }

  const removeToCart = async () => {
    try {
      await deleteDocument(cartId)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <img src={item.imageURL} alt="card items" />
      </div>
      <div className="card-body">
        <h3>{item.name}</h3>
        <p>{item.price}</p>
        <p>{item.detail}</p>
      </div>
      <div className="card-footer">
        <button className="btn" onClick={()=> navigate(`/details/${item.id}`)}>Details</button>
        <button className="btn">Buy</button>
        {window.location.pathname === '/cart' ? (
          <button className="btn" onClick={removeToCart}>
            <img src={CartRemove} alt="cart add" />
          </button>
        ) : (
          <button className="btn" onClick={addToCart}>
            <img src={CartAdd} alt="cart add" />
          </button>
        )}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
