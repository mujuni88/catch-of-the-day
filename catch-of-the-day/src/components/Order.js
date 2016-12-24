// @flow weak

import React, {Component} from 'react'
import {formatPrice} from '../helpers'

class Order extends Component{
  renderOrder = (key) => {
    const {order, fishes} = this.props
    const fish = fishes[key]
    const count = order[key]

    if(!fish || fish.status === 'unavailable'){
      return <li key={key}>Sorry, {fish ? fish.name : 'Fish'} is no longer available!</li>
    }

    return (
      <li key={key}>
        <span>{count}lbs {fish.name}</span>
        <span className='price'>{formatPrice(count * fish.price)}</span>
      </li>
    )
  }
  render(){
    const {order, fishes} = this.props
    const orderIds = Object.keys(order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key]
      const count = order[key]
      const isAvailable = fish && fish.status === 'available'
      if(isAvailable){
        return prevTotal + (count * fish.price || 0)
      }

      return prevTotal
    }, 0)
    return (
      <div className='order-wrap'>
        <h2>Your Order</h2>
        <ul className='order'>
          {orderIds.map(this.renderOrder)}
          <li className='total'>
            <strong>Total: </strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }
}

export default Order;
