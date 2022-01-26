import { useCollection } from '../../hooks/useCollection'

// styles
import './Dashboard.css'

// components
import Card from '../../components/Card'


export default function Dashboard() {
  const { documents:items , error} = useCollection('items')
  return (
    <div className="card-wrapper">
      {items && items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
      {error && <p className="error">{error}</p> }
    </div>
  ) 
}