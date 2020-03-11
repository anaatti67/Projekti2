import React, { Component } from 'react';
import './App.css';
import MyTable from './MyTable';
import { checkPropTypes } from 'prop-types';

const ShoppingCart = (props) => {
  let tab = props.data.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.price}</td><td>{item.qty}</td></tr>)
  return (
        <div>
          <h3>Shopping Cart</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {tab}
            </tbody>
          </table>
        </div>
        )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.buy = this.buy.bind(this)
    this.state = this.state = {shoppingcart: []}
    this.cartInit()
  }
  cartInit() {
    var retrievedData = localStorage.getItem("shoppingCart");
    var dataToArray = JSON.parse(retrievedData);
    if (dataToArray != null) {
      for (let x = 0; x < dataToArray.length; x++) {
        this.state.shoppingcart.push(dataToArray[x])
      }
    }
  }
  buy(product) {    
    let length = this.state.shoppingcart.length
    let newItem = 0;
    for (let x = 0; x < length; x++) {
      if (this.state.shoppingcart[x].id === product.id) {
        this.state.shoppingcart[x].qty++
        this.state.shoppingcart[x].price += product.price
        newItem++;
      }
    }    
    if (newItem === 0) {
      product.qty = 1
      this.state.shoppingcart.push(product)
    }
    this.setState({shoppingcart: this.state.shoppingcart})
    localStorage.setItem("shoppingCart", JSON.stringify(this.state.shoppingcart));
  }
  render() {
    return (
      <div>
        <div className="container">
          <h1 className="mt-5">Apple Fanboy Store</h1>
          <h5>Items</h5>
          <MyTable url="http://localhost:8080/products/" buyClicked={this.buy}/>
          <ShoppingCart data={this.state.shoppingcart}/>
          <button type="button" className="btn btn-primary" onClick={() => {
            localStorage.clear()
            this.setState({shoppingcart: []})
            }}>Clear Local Storage</button>
        </div>
      </div>
    )
  }
}

export default App