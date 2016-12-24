import React, { Component } from 'react'
import AddFishForm from './AddFishForm'
import base from '../base'

class Inventory extends Component {
  constructor() {
    super()
    this.state = {
      uid: null,
      owner: null
    }
  }
  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user })
      }
    })
  }
  handleChange = (e, key) => {
    const {updateFish, fishes} = this.props
    const fish = {
      ...fishes[key],
      [e.target.name]: e.target.value
    }
    updateFish(key, fish)
  }
  renderInventory = (key) => {
    const {fishes, removeFish} = this.props
    const fish = fishes[key]
    return (
      <div key={key} className='fish-edit'>
        <input  type='text' onChange={(e) => this.handleChange(e, key)} name='name' value={fish.name} placeholder='Fish Name'/>
        <input  type='text' onChange={(e) => this.handleChange(e, key)} name='price' value={fish.price}  placeholder='Fish Price'/>
        <select value={fish.status} onChange={(e) => this.handleChange(e, key)} name='status'>
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out!</option>
        </select>
        <textarea  type='text'  onChange={(e) => this.handleChange(e, key)} name='desc' value={fish.desc} placeholder='Fish Desc'/>
        <input  type='text'  onChange={(e) => this.handleChange(e, key)} name='image' value={fish.image} placeholder='Fish Image'/>
        <button onClick={() => removeFish(key)}>Remove Fish</button>
      </div>
    )
  }
  authHandler = (err, authData) => {
    console.log({
      authData
    })
    if (err) {
      console.error(err)
      return
    }

    const {storeId} = this.props
    const storeRef = base.database().ref(storeId)

    // query firebase once for data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {}
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        })
      }
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })

  }
  authenticate = (provider) => {
    console.log(`Trying to login with ${provider}`)
    base.authWithOAuthPopup(provider, this.authHandler)
  }
  renderLogin = () => (
    <nav className='login'>
      <h2>Inventory</h2>
      <p>Sign in to manage your store's inventory</p>
      <button className='github' onClick={() => this.authenticate('github')}>Login with GitHub</button>
      <button className='facebook' onClick={() => this.authenticate('facebook')}>Login with Facebook</button>
      <button className='google' onClick={() => this.authenticate('google')}>Login with Google</button>
    </nav>
  )
  logOut = () => {
    console.log('Logout')
    base.unauth()
    this.setState({uid:null})
  }
  render() {
    const {fishes, addFish, loadSamples} = this.props
    const logout = <button onClick={this.logOut}>Log Out!</button>
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }
    if (this.state.uid !== this.state.owner) {
      return <div>
        <p>Sorry, you aren't the owner of this store</p>
        {logout}
      </div>
    }

    return (
      <div>
      <h2>Inventory</h2>
      {logout}
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
Inventory.propTypes = {
  addFish: React.PropTypes.func.isRequired,
  fishes: React.PropTypes.object.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
}
export default Inventory
