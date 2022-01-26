import './Card.css'

export default function Card({itemName, itemImg, itemPrice, itemDesc}) { 
  
  return (
    <div className="card">
      <div className="card-header">
        <img src="https://picsum.photos/200/300" alt="card items" />
      </div>
      <div className="card-body">
        <h3>Iphone 13</h3>
        <p>Rp.15.000.000'-</p>
        <p>Hp anak sultan</p>
      </div>
      <div className="card-footer">
        <button>buy</button>
        <button>Add to Cart</button>
      </div>
    </div>
    ) 
}