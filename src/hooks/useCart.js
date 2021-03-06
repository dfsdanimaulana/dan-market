import { useState } from 'react'

// hooks
import { useFirestore } from './useFirestore'
import { useAuthContext } from './useAuthContext'

export const useCart =  () => { 
  const [error, setError]= useState(null)
  const { addDocument , deleteDocument} = useFirestore('carts')
  const { user } = useAuthContext()
  
  // add item to cart  collection
  const addToCart = async (item) => {
    setError(null)
    try {
      await addDocument({
        item,
        uid: user.uid,
        count:1
      })
    } catch (err) {
      setError(err.message)
    }
  }
  
  const deleteFromCart = async (id) => {
    setError(null)
    try {
      await deleteDocument(id)
    } catch (err) {
      setError(err.message)
    }
  }
  
  return { error, deleteFromCart, addToCart }
  
}