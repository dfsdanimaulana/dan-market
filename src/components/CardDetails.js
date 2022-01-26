import { useDocument } from '../hooks/useDocument'
import { useParams } from 'react-router-dom'

export default function CardDetails() {
  const { id } = useParams()
  const { document: item, error } = useDocument('items', id)

  return (
    <div>
      {item && <p>{item.name}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  )
}
