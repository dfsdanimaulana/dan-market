import Card from '../../components/Card'
import { useCollection } from '../../hooks/useCollection'

import './Cart.css'

export default function Cart() {
  const { documents: carts, error } = useCollection('carts')

  return (
    <div>
      {carts && carts.length < 1 && <p>No items in cart</p>}
      {carts &&
        carts.map((cart) => (
          <Card key={cart.id} item={cart.item} cartId={cart.id} />
        ))}
      {error && <p className="error">{error}</p>}
    </div>
  )
}
