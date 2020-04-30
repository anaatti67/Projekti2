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
          <div id="productInfoContainer" className="shoppingCartElement">
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
          <div id="userInfoContainer" className="shoppingCartElement display-none">
          <form>
            
              <div className="form-group">
              <div id="halfForm1">
                        <label htmlFor="email">Sähköpostiosoite</label>
                        <input placeholder="example@gmail.com" type="text"/>

                        <label htmlFor="email2">Sähköpostiosoite uudelleen</label>
                        <input type="text" placeholder="example@gmail.com"/>

                        <label id="passwordLabel" htmlFor="name">Salasana</label>
                        <input type="text" placeholder="vähintään 8 merkkiä"/>

                        <label  htmlFor="name">Salasana uudelleen</label>
                        <input id="passwordInput2" type="text" placeholder="vähintään 8 merkkiä"/>

                       

                       
                    </div>
                    <div id="halfForm2">
                    <label htmlFor="name">Etunimi</label>
                        <input type="text" placeholder="kirjoita etunimesi"/>

                        <label htmlFor="name">Sukunimi</label>
                        <input type="text" placeholder="kirjoita sukunimesi"/>

                        <label id="phonenumberLabel" htmlFor="name">Puhelinnumero</label>
                        <input type="text" placeholder="kirjoita puh.numerosi"/>
                    </div>
                   
              </div>
                    
                   
                </form>
               
          </div>
          <button id="userInfoButton" type="button" className="btn btn-primary userInfoButton display-none">Lähetä tiedot</button>
        </div>
        )

      

     
}

function activeTab(e) {
     resetActiveTab()
     let tabName = e.target.id
     let element = document.getElementById(tabName)
     if(tabName === "productInfo") {
      setActiveElement("productInfo")
       element.classList.add("activeTab")
     }
     if(tabName === "userInfo") {
       setActiveElement("userInfo")
      element.classList.add("activeTab")
    }
    if(tabName === "deliveryInfo") {
      setActiveElement("deliveryInfo")
      element.classList.add("activeTab")
    }
    if(tabName === "paymentInfo") {
      setActiveElement("paymentInto")
      element.classList.add("activeTab")
    }
    if(tabName === "summaryInfo") {
      setActiveElement("summaryInfo")
      element.classList.add("activeTab")
    }
        
}

function resetActiveTab() {
  let elements = document.querySelectorAll(".activeTab")
  elements[0].classList.remove("activeTab")
}

function setActiveElement(tabName) {
  let shoppingCartElements = document.querySelectorAll(".shoppingCartElement")
  let emptyCartButton = document.getElementById("emptyCartButton")
  let userInfoButton = document.getElementById("userInfoButton")
  for (let i = 0; i < shoppingCartElements.length; i++) {
  
    if(shoppingCartElements[i].id !== tabName+"Container") {
      shoppingCartElements[i].classList.add("display-none")
      if(shoppingCartElements[i].id === "productInfoContainer") {
        emptyCartButton.classList.add("display-none")
      }
      if(shoppingCartElements[i].id === "userInfoContainer") {
        userInfoButton.classList.add("display-none")
      }
    } if (shoppingCartElements[i].id == tabName+"Container") {
      shoppingCartElements[i].classList.remove("display-none")
      if(shoppingCartElements[i].id === "productInfoContainer") {
        emptyCartButton.classList.remove("display-none")
      }
      if(shoppingCartElements[i].id === "userInfoContainer") {
        userInfoButton.classList.remove("display-none")
      }
    } 
  }
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
          <button id="emptyCartButton" type="button" className="btn btn-primary" onClick={() => {
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