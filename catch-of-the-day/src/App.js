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
	constructor(){
		super()
		// initial state
		this.state = {
			fishes: {},
			order:{}
		}
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
			console.log({order})
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
	render(){
		return (
			<div className='catch-of-the-day'>
				<div className='menu'>
					<Header tagline='Fresh Seafood Market'/>
					<ul className='list-of-fishes'>
						{
							Object
							.keys(this.state.fishes)
							.map(fish => <Fish id={fish} key={fish} {...this.state.fishes[fish]} addToOrder={this.addToOrder}/>)
						}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					params={this.props.params}
				/>
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		)
	}
}

export default App;
