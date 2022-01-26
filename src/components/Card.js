// icons
import CartAdd from '../assets/cartAdd.svg'
// styles
import './Card.css'

export default function Card({ itemName, itemImg, itemPrice, itemDesc }) {
  return (
    <div className="card">
      <div className="card-header">
        <img src="https://picsum.photos/200/100" alt="card items" />
      </div>
      <div className="card-body">
        <h3>Iphone 13</h3>
        <p>Rp.15.000.000'-</p>
        <p>Hp anak sultan</p>
      </div>
      <div className="card-footer">
        <button className="btn">Details</button>
        <button className="btn">Buy</button>
        <button className="btn">
          <img src={CartAdd} alt="cart add" />
        </button>
      </div>
    </div>
  )
}
