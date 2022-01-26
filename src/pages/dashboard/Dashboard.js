// styles
import './Dashboard.css'

// components
import Card from '../../components/Card'

const items = [1,2,3,4]

export default function Dashboard() {
  return (
    <div className="card-wrapper">
      {items && items.map((item, i) => (
        <Card key={i} />
      ))}
    </div>
  ) 
}