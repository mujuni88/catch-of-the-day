import React, {Component} from 'react'
import AddFishForm from './AddFishForm'

class Inventory extends Component{
  handleChange = (e, key) => {
    const {updateFish, fishes} = this.props
    const fish = fishes[key]
    const updatedFish = {...fish,  [e.target.name]:e.target.value}
    console.log({updatedFish})
    updateFish(key, updatedFish)
  }
  renderInventory = (key) => {
    const {fishes, removeFish} = this.props
    const fish = fishes[key]
    return (
      <div key={key} className='fish-edit'>
        <input  type='text' onChange={(e)=>this.handleChange(e, key)} name='name' value={fish.name} placeholder='Fish Name'/>
        <input  type='text' onChange={(e)=>this.handleChange(e, key)} name='price' value={fish.price}  placeholder='Fish Price'/>
        <select value={fish.status} onChange={(e)=>this.handleChange(e, key)} name='status'>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea  type='text'  onChange={(e)=>this.handleChange(e, key)} name='desc' value={fish.desc} placeholder='Fish Desc'/>
        <input  type='text'  onChange={(e)=>this.handleChange(e, key)} name='image' value={fish.image} placeholder='Fish Image'/>
        <button onClick={()=> removeFish(key)}>Remove Fish</button>
      </div>
    )
  }
  render(){
    const {fishes, addFish, loadSamples} = this.props

    return (
    <div>
      <p>Inventory</p>
      {Object.keys(fishes).map(this.renderInventory)}
      <AddFishForm
        fishes={this.props.fishes}
        addFish={addFish}
      />
      <button onClick={loadSamples}>Load Sample Fishes</button>
    </div>
    )
  }
}

export default Inventory
