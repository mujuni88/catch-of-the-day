import React from 'react'
import {formatPrice} from '../helpers'

const Fish = ({fish:{name, price, desc, image, status}, id, addToOrder})=>{
  const isAvailable = status === 'available'
  const buttonText = isAvailable ? 'Add To Order': 'Sold Out!'
  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button onClick={() => addToOrder(id)} disabled={!isAvailable}>{buttonText}</button>
    </li>
  )

}

Fish.propTypes = {
  fish: React.PropTypes.object.isRequired,
  addToOrder: React.PropTypes.func.isRequired
}
export default Fish
