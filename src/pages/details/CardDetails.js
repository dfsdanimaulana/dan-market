import { useParams } from 'react-router-dom'

// hooks
import { useDocument } from '../../hooks/useDocument'
import { useCart } from '../../hooks/useCart'

// components
import Avatar from '../../components/Avatar'

// styles
import './CardDetails.css'
import Comment from './Comment'

export default function CardDetails() {
  const { id } = useParams()
  const { document: item, error } = useDocument('items', id)
  const { addToCart } = useCart()

  return (
    <div>
      {item && (
        <div className="details-wrapper">
          <div className="details-item">
            <div className="details-header">
              <img src={item.imageURL} alt="detail" />
            </div>
            <div className="details-body">
              <h2>{item.name}</h2>
              <p>${item.price}</p>
              <p>{item.detail}</p>
              <button className="btn" onClick={() => addToCart(item)}>
                Add to cart
              </button>
              <div className="details-seller">
                <Avatar src={item.seller.photoURL} />
                <p>{item.seller.displayName}</p>
              </div>
            </div>
          </div>
          <Comment />
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  )
}
