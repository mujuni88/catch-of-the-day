import React from 'react'
import AddFishForm from './AddFishForm'

const Inventory = ({addFish, loadSamples}) => (
<div>
  <p>Inventory</p>
  <AddFishForm addFish={addFish}/>
  <button onClick={loadSamples}>Load Sample Fishes</button>
</div>
)


export default Inventory
