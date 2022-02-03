import { useEffect } from 'react'

// components
import Card from '../../components/Card'

// hooks
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Cart.css'

export default function Cart() {
  const { user } = useAuthContext()
  const { documents: carts, error } = useCollection('carts', [
    'uid',
    '==',
    user.uid,
  ])

  useEffect(() => {
    if (carts) {
      const cartsList = []

      carts.forEach((cart) => {
        cartsList.push(cart.item.name)
      })

      // get every unique item
      let unique = [...new Set(cartsList)]
      console.log(unique)
    }
  }, [carts])

  return (
    <div className="card-wrapper">
      {carts && carts.length < 1 && <p>No items in cart</p>}
      {carts &&
        carts.map((cart) => (
          <Card key={cart.id} item={cart.item} cartId={cart.id} />
        ))}
      {error && <p className="error">{error}</p>}
    </div>
  )
}
