import { useState } from 'react'
import Select from 'react-select'
import { storage } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'

// hooks
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

// styles
import './Sell.css'

// select field options
const categories = [
  { value: 'food', label: 'Food' },
  { value: 'electronic', label: 'Electronic' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'sports', label: 'Sports' },
  { value: 'other', label: 'Other' },
]

export default function Sell() {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [thumbError, setThumbError] = useState(null)
  const [error, setError] = useState(null)
  const { response, addDocument } = useFirestore('items')

  // form field values
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [detail, setDetail] = useState('')
  const [category, setCategory] = useState('food')
  const [thumb, setThumb] = useState(null)

  // handle image input
  const handleFileChange = (e) => {
    setThumbError(null)
    let selected = e.target.files[0]

    // cek if file exists
    if (!selected) {
      setThumbError('Please select an image')
      return
    }

    // cek if selected file is an image
    if (!selected.type.includes('image')) {
      setThumbError('File must be an image')
      return
    }

    // cek image size
    if (!selected.size > 100000) {
      setThumbError('Image size must be less than 100kb')
      return
    }

    setThumbError(null)
    setThumb(selected)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // handle image upload

      // create thumb image folder path
      const uploadPath = `items/${user.uid}/${thumb.name}`
      // upload image
      const img = await storage.ref(uploadPath).put(thumb)
      // get image url
      const imageURL = await img.ref.getDownloadURL()

      // seller object
      const seller = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid,
      }

      // item value
      const itemToSell = {
        name,
        price,
        detail,
        imageURL,
        category,
        comment: [],
        rating: [],
        seller,
      }
      // add document to firestore

      await addDocument(itemToSell)
      // redirect if success
      if (!response.error) {
        navigate('/')
      }
    } catch (err) {
      setError(err.message)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sell New Item</h2>
      <label>
        <span>Picture:</span>
        <input type="file" required onChange={handleFileChange} />
        {thumbError && <div className="error">{thumbError}</div>}
      </label>
      <label>
        <span>Name:</span>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </label>
      <label>
        <span>Price:</span>
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
        />
      </label>
      <label>
        <span>Item Details:</span>
        <textarea
          type="text"
          onChange={(e) => setDetail(e.target.value)}
          value={detail}
          required></textarea>
      </label>
      <label>
        <span>Item category:</span>
        <Select
          options={categories}
          onChange={(option) => setCategory(option.value)}
        />
      </label>
      <button className="btn">Post</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}
