import React, { Component } from 'react';

const ShoppingCart = (props) => {
  let totalsum = 0
  for (let x = 0; x < props.data.length; x++) {
    totalsum = totalsum + props.data[x].price
  }
  let cart = props.data
  console.log(cart)
  let tab = cart.map((item) => 
              <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.qty}</td>
                  <td>
                    
                    <button type="button" className="btn btn-primary" onClick={() => { 
                        props.add(item.id)
                        }}>
                        Lisää
                    </button> <button type="button" className="btn btn-primary" onClick={() => { 
                        props.remove(item.id)}}>
                        Poista
                    </button>
                    
                  </td>
              </tr>)
            
  return (
        <div>
          <div className="shoppingCartNavBar">
           <button id="productInfo" className="shoppingCartNavButton productInfo activeTab" onClick={(e) => activeTab(e)}></button>
           <div className="connectionLine"></div>
           <button id="userInfo" className="shoppingCartNavButton userInfo" onClick={(e) => activeTab(e)}></button>
           <div className="connectionLine"></div>
           <button id="deliveryInfo" className="shoppingCartNavButton deliveryInfo" onClick={(e) => activeTab(e)}></button>
           <div className="connectionLine"></div>
           <button id="paymentInfo" className="shoppingCartNavButton paymentInfo" onClick={(e) => activeTab(e)}></button>
           <div className="connectionLine"></div>
           <button id="summaryInfo" className="shoppingCartNavButton summaryInfo" onClick={(e) => activeTab(e)}></button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Nimi</th>
                <th>Yhteensä</th>
                <th>Määrä</th>
                <th>Toiminto</th>
              </tr>
            </thead>
            <tbody>
              {tab}
              <tr>
                <td></td>
                <td>{totalsum}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        )

      

     
}

function activeTab(e) {
     resetActive()
     let tabName = e.target.id
     let element = document.getElementById(tabName)
     console.log(e.target)
     if(tabName === "productInfo") {
       console.log("1")
       element.classList.add("activeTab")
     }
     if(tabName === "userInfo") {
      console.log("2")
      element.classList.add("activeTab")
    }
    if(tabName === "deliveryInfo") {
      console.log("3")
      element.classList.add("activeTab")
    }
    if(tabName === "paymentInfo") {
      console.log("4")
      element.classList.add("activeTab")
    }
    if(tabName === "summaryInfo") {
      console.log("5")
      element.classList.add("activeTab")
    }
        
}

function resetActive() {
  let elements = document.querySelectorAll(".activeTab")
  elements[0].classList.remove("activeTab")
  
}

class App extends Component {
  constructor(props) {
    super(props)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.state = {shoppingcart: []}
    this.cartInit()
  }
  cartInit() {
    if ("shoppingCart" in localStorage) {
      let retrievedData = localStorage.getItem("shoppingCart");

      if (retrievedData === 'undefined') {
        localStorage.setItem("shoppingCart", JSON.stringify(this.state.shoppingcart));
      } else {
        var dataToArray = JSON.parse(retrievedData);
    
        if (dataToArray != null) {
          for (let x = 0; x < dataToArray.length; x++) {
            this.state.shoppingcart.push(dataToArray[x])
            
          }
          console.log(this.state.shoppingcart)
        }
      }
    } 
  }
  add(id) {
    let cart = this.state.shoppingcart
    let found = cart.find(product => product.id === id)
    found.qty += 1
    this.setState({shoppingcart: cart})
    this.updateCartOverallQuantity(1)
  }
  remove(id) {
    let cart = this.state.shoppingcart
    let found = cart.find(product => product.id === id)
    if (found.qty > 0) {
      found.qty -= 1
      this.updateCartOverallQuantity(-1)
    }
    this.setState({shoppingcart: cart})
  }
  updateCartOverallQuantity(amount) {
    if ("shoppingCartOverallQuantity" in localStorage) {
      let retrievedData = localStorage.getItem("shoppingCartOverallQuantity");
      console.log(retrievedData)
      if (retrievedData === null) {
        localStorage.setItem("shoppingCartOverallQuantity", JSON.stringify(0));
      } else {
        var data = JSON.parse(retrievedData);
        data += amount
        localStorage.setItem("shoppingCartOverallQuantity", JSON.stringify(data));
      }
    } else {
      localStorage.setItem("shoppingCartOverallQuantity", JSON.stringify(0));
    }
  }
  render() {
    return (
      <div>
        <div className="container">
          <h1 className="mt-5">Ostoskori</h1>
          <ShoppingCart data={this.state.shoppingcart} add={this.add} remove={this.remove} />
          <button type="button" className="btn btn-primary" onClick={() => {
            localStorage.removeItem("shoppingCart")
            localStorage.removeItem("shoppingCartOverallQuantity")
            this.setState({shoppingcart: []})
            }}>Tyhjennä ostoskori</button>
        </div>
      </div>
    )
  }
}

export default App