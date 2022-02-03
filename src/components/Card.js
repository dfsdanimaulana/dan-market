import { useNavigate } from 'react-router-dom'

// hooks
import { useCart } from '../hooks/useCart'

// icons
import CartAdd from '../assets/icons/cartAdd.svg'
import CartRemove from '../assets/icons/cartRemove.svg'

// styles
import './Card.css'

export default function Card({ item, cartId }) {
  const navigate = useNavigate()
  
  // hooks
  const { addToCart, deleteFromCart, error } = useCart()

  const handleAddToCart = async () => {
    addToCart(item)
  }

  return (
    <div className="card shadow">
      <div className="card-header">
        <img src={item.imageURL} alt="card items" />
      </div>
      <div className="card-body">
        <h4>{item.name}</h4>
        <p>{item.price}</p>
        <p>{item.detail}</p>
      </div>
      <div className="card-footer">
        <button className="btn" onClick={()=> navigate(`/details/${item.id}`)}>Details</button>
        {window.location.pathname === '/cart' ? (
          <button className="btn" onClick={()=> deleteFromCart(cartId)}>
            <img src={CartRemove} alt="cart add" />
          </button>
        ) : (
          <button className="btn" onClick={handleAddToCart}>
            <img src={CartAdd} alt="cart add" />
          </button>
        )}
        <button className="btn">Buy</button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>  
  )
}
