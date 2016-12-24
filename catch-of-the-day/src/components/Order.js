// @flow weak

import React, {Component} from 'react'
import {formatPrice} from '../helpers'
import CssTransitionGroup from 'react-addons-css-transition-group'

class Order extends Component{
  renderOrder = (key) => {
    const {order, fishes, removeOrder} = this.props
    const fish = fishes[key]
    const count = order[key]
    const removeOrderBtn = <button onClick={()=>removeOrder(key)}>&times;</button>
    if(!fish || fish.status === 'unavailable'){
      return <li key={key}>Sorry, {fish ? fish.name : 'Fish'} is no longer available! {removeOrderBtn}</li>
    }

    return (
      <li key={key}>
        <span>
          <CssTransitionGroup
            className='count'
            transitionName='count'
            component='span'
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CssTransitionGroup>
          lbs {fish.name}</span>
        <span className='price'>{formatPrice(count * fish.price)}</span>
        {removeOrderBtn}
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
        <CssTransitionGroup
          className='order'
          component='ul'
          transitionName='order'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          >
          {orderIds.map(this.renderOrder)}
          <li className='total'>
            <strong>Total: </strong>
            {formatPrice(total)}
          </li>
        </CssTransitionGroup>
      </div>
    )
  }
}
Order.propTypes = {
  order:React.PropTypes.object.isRequired,
  fishes:React.PropTypes.object.isRequired,
  removeOrder: React.PropTypes.func.isRequired
}
export default Order;
