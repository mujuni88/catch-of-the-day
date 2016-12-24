// @flow weak

import React, {Component} from 'react';
import Header from './components/Header'
import Order from './components/Order'
import Inventory from './components/Inventory'
import Fish from './components/Fish'
import './css/style.css'
import sampleFishes from './sample-fishes'
import base from './base'

class App extends Component{
	state = {
		fishes: {},
		order:{},
	}

	constructor(){
		super()
	}
	componentWillMount(){
		// runs before app is rendered
		const {storeId} = this.props.params
		this.ref = base.syncState(`${storeId}/fishes`, {
			context:this,
			state:'fishes'
		})

		//check if there is any localStorage
		const localStorageRef = localStorage.getItem(`order-${storeId}`)
		if(localStorageRef){
			const order = JSON.parse(localStorageRef)
			this.setState({order})
		}
	}
	componentWillUpdate(nextProps, nextState){
		const {storeId} = nextProps.params
		const order = JSON.stringify(nextState.order, 4)
		localStorage.setItem(`order-${storeId}`, order)
	}
	componentWillUnMount(){
		base.removeBinding(this.ref)
	}
	addFish = (fish) => {
		const fishes = {...this.state.fishes}
		const timestamp = Date.now()
		fishes[`fish-${timestamp}`] = fish

		// update our state
		this.setState({
			fishes:fishes
		})
	}

	updateFish = (key, fish) => {
		const fishes = {...this.state.fishes, [key]:fish}
		this.setState({fishes})
	}
	removeFish = (key) => {
		const fishes = {...this.state.fishes}
		fishes[key] = null
		this.setState({fishes})
	}
	loadSamples = ()=>{
		this.setState({
			fishes:sampleFishes
		})
	}

	addToOrder = (key) => {
		const order = {...this.state.order}
		order[key] = ++order[key] || 1

		this.setState({order})
	}
	removeOrder = (key) => {
		const order = {...this.state.order}
		delete order[key]

		localStorage.removeItem(key)
		this.setState({order})
	}
  render() {
		return (
			<div className='catch-of-the-day'>
				<div className='menu'>
					<Header tagline='Fresh Seafood Market'/>
					<ul className='list-of-fishes'>
						{
							Object
							.keys(this.state.fishes)
							.map(fish => <Fish id={fish} key={fish} fish={this.state.fishes[fish]} addToOrder={this.addToOrder}/>)
						}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					params={this.props.params}
					removeOrder={this.removeOrder}
				/>
				<Inventory
					addFish={this.addFish}
					fishes={this.state.fishes}
					loadSamples={this.loadSamples}
					updateFish={this.updateFish}
					removeFish={this.removeFish}
					storeId={this.props.params.storeId}
				/>
			</div>
		)
	}

	static propTypes = {
		params: React.PropTypes.object.isRequired
	}
}
export default App;
