import React, { Component } from 'react';


const ShoppingCart = (props) => {
  
  let totalSum = 0
  var totalSumString
  //console.log(props)
  
  for (let i = 0; i < props.data.length; i++) {
    totalSum += (props.data[i].price * props.data[i].qty)
    totalSumString = "kokonaishinta: " + totalSum + " €"
    
  }
 let cart = props.data
  //console.log(cart)
  setCart(cart, totalSum)
  let tab = cart.map((item) => 
              <tr key={item.id} id={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price} €</td>
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
                <th>Yksikköhinta</th>
                <th>Määrä</th>
                <th>Toiminto</th>
              </tr>
            </thead>
            <tbody>
              {tab}
              <tr>
                <td></td>
                <td>{totalSumString}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          </div>
          <div id="userInfoContainer" className="shoppingCartElement display-none">
          <form>
            
              <div className="form-group">
              <h3>Täytä yhteystiedot</h3>
              <div id="halfForm1">
                        <label htmlFor="email">Sähköpostiosoite</label>
                        <input placeholder="example@gmail.com" type="text"/>

                        <label htmlFor="email2">Sähköpostiosoite uudelleen</label>
                        <input type="text" placeholder="example@gmail.com"/>

                        <label id="passwordLabel" htmlFor="pass">Salasana</label>
                        <input type="text" placeholder="vähintään 8 merkkiä"/>

                        <label  htmlFor="pass2">Salasana uudelleen</label>
                        <input id="passwordInput2" type="text" placeholder="vähintään 8 merkkiä"/>

                    </div>
                    <div id="halfForm2">
                    <label htmlFor="fname">Etunimi</label>
                        <input type="text" placeholder="kirjoita etunimesi"/>

                        <label htmlFor="lname">Sukunimi</label>
                        <input type="text" placeholder="kirjoita sukunimesi"/>

                        <label id="phonenumberLabel" htmlFor="phone">Puhelinnumero</label>
                        <input type="text" placeholder="kirjoita puh.numerosi"/>
                    </div>
                   
              </div>
                </form>
          </div>
          <button id="userInfoButton" type="button" className="btn btn-primary userInfoButton display-none">Lähetä tiedot</button>
          
          <div id="deliveryInfoContainer" className="shoppingCartElement display-none">
            <h3>Valitse Toimitustapa</h3>
            <div className="deliveryOptionsContainer">
              <div className="deliveryOption">
              <label htmlFor="delivery1">Kuljetus noutopisteesen</label>
              <input type="checkbox"  name="delivery1" className="deliveryInput" onClick={(e) => checkHandler(e)}/>
              </div>
             
            <div className="deliveryOption">
            <label htmlFor="delivery2">Kuljetus lähimpään postiin</label>
            <input type="checkbox" name="delivery2" className="deliveryInput" onClick={(e) => checkHandler(e)}/>
            </div>

            <div className="deliveryOption">
            <label htmlFor="delivery3">Kuljetus kotiin</label>
              <input type="checkbox" name="delivery3" className="deliveryInput" onClick={(e) => checkHandler(e)}/>
            </div>
            
            
            </div>
           <button className="btn btn-primary deliveryInfoButton" onClick={() => toNextTab("deliveryTab")}>Seuraava</button>
          </div>

          <div id="paymentInfoContainer" className="shoppingCartElement display-none">
              <div className="paymentOption optionBank">
                <h3>Verkkopankki</h3>
                <div className="bankImages">
                  <button id="op" className="paymentOptionButton op"  onClick={(e) => selectedPayment(e)}></button>
                  <button id="nordea" className="paymentOptionButton nordea" onClick={(e) => selectedPayment(e)}></button>
                  <button id="danskebank" className="paymentOptionButton danskebank" onClick={(e) => selectedPayment(e)}></button>
                  <button id="spankki" className="paymentOptionButton spankki" onClick={(e) => selectedPayment(e)}></button>
                  <button id="aktia" className="paymentOptionButton aktia" onClick={(e) => selectedPayment(e)}></button>
                </div>
              </div>

              <div className="paymentOption optionCard">
                <h3>Maksukortti</h3>
                <div className="cardImages">
                  <button id="visa" className="paymentOptionButton visa" onClick={(e) => selectedPayment(e)}></button>
                  <button id="mastercard" className="paymentOptionButton mastercard"onClick={(e) => selectedPayment(e)}></button>
                  <button id="verifone" className="paymentOptionButton verifone"onClick={(e) => selectedPayment(e)}></button>
                  <button id="americanExpress" className="paymentOptionButton americanExpress"onClick={(e) => selectedPayment(e)}></button>
                 
                </div>
                <button className="btn btn-primary paymentInfoButton">Seuraava</button>
              </div>
          </div>

          <div id="summaryInfoContainer" className="shoppingCartElement display-none">
              <div className="itemSummaryContainer">
                <h3 className="summaryInformativeTitle">Vahvista tilauksen tiedot</h3>
                <div id="itemSummaryContainer">

                </div>
              </div>
          </div>
        </div>
        )
}


var currentShoppingCartChoices
function setCart(shoppingcart, totalSum) {
  currentShoppingCartChoices = {
 items: shoppingcart,
 totalPrice: totalSum,
 userInfo: {
   s_post: "",
   f_name: "",
   s_name: "",
   p_nro: ""
 },
 delivery_method: "",
 payment_method: ""
}


}

function selectedPayment(e) {
  e.target.classList.add("selectedPaymentMethod")
  let paymentOptions = document.querySelectorAll(".paymentOptionButton")
  for (let i = 0; i < paymentOptions.length; i++) {
  if(paymentOptions[i].id !== e.target.id) {
    paymentOptions[i].classList.remove("selectedPaymentMethod")
  }
  }
}

function checkHandler(e) {
  resetOtherCheckBoxes(e.target);
}

function toNextTab(tabName) {
  if(tabName === "deliveryTab") {
    let checkboxes = document.querySelectorAll(".deliveryInput")
    let checkedBoxes = 0;
    for (let i = 0; i < checkboxes.length; i++) {
      if(checkboxes[i].checked === true) {
       checkedBoxes++
      }
    }
    if(checkedBoxes === 0) {
      alert("Valitse toimitustapa")
    }
  }

  if(tabName === "productInfo") {
    console.log("Checking cart choices..")
    console.log(currentShoppingCartChoices)
    if(currentShoppingCartChoices.items.length === 0) {
      alert("Ostoskori on tyhjä")
    }
  }
  
}



function resetOtherCheckBoxes(selectedCheckBox) {
  let checkedCheckBoxName = selectedCheckBox.name
  let checkboxes = document.querySelectorAll(".deliveryInput")
  for (let i = 0; i < checkboxes.length; i++) {
  if(checkboxes[i].name !== checkedCheckBoxName) {
    checkboxes[i].checked = ""
  }
  }
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
      setActiveElement("paymentInfo")
      element.classList.add("activeTab")
    }
    if(tabName === "summaryInfo") {
      setActiveElement("summaryInfo")
      element.classList.add("activeTab")
      setItemSummary()
    }
        
}

function setItemSummary() {
  let element = document.getElementById("itemSummaryContainer")
  element.innerHTML = ""
 for (let i = 0; i < currentShoppingCartChoices.items.length; i++) {
   setItemInfo(currentShoppingCartChoices.items[i], element)
 }
  setTotalPrice(currentShoppingCartChoices,element)
}

function setItemInfo(item, element) {
  setTitle(item, element)
  setUnitPrice(item, element)
 
}

function setTotalPrice(items,element) {
  let totalHTML = document.createElement("h2")
  totalHTML.classList.add("totalHTML")
  totalHTML.innerHTML = "Yhteensä: " + items.totalPrice + "€"
  element.appendChild(totalHTML)
}

function setUnitPrice(item, element) {
  let unitPrice = document.createElement("p")
  unitPrice.classList.add("informativeTextElement")
  unitPrice.innerHTML = "Yksikköhinta: " + item.price + " €"
  element.appendChild(unitPrice)
  
}

function setTitle(item, element) {
  let title = document.createElement("h4")
  title.classList.add("itemSummaryTitle")
  title.innerHTML = item.qty + "x " + item.name
  element.appendChild(title)
}

function resetActiveTab() {
  let elements = document.querySelectorAll(".activeTab")
  elements[0].classList.remove("activeTab")
}

function setActiveElement(tabName) {
  let shoppingCartElements = document.querySelectorAll(".shoppingCartElement")
  let emptyCartButtons = document.querySelectorAll(".emptyCartButtons")
  let userInfoButton = document.getElementById("userInfoButton")
  for (let i = 0; i < shoppingCartElements.length; i++) {
    if(shoppingCartElements[i].id !== tabName+"Container") {
      shoppingCartElements[i].classList.add("display-none")
      if(shoppingCartElements[i].id === "productInfoContainer") {
        for (let i = 0; i < emptyCartButtons.length; i++) {
          emptyCartButtons[i].classList.add("display-none")
        }
      }
      if(shoppingCartElements[i].id === "userInfoContainer") {
        userInfoButton.classList.add("display-none")
      }
    } if (shoppingCartElements[i].id === tabName+"Container") {
      shoppingCartElements[i].classList.remove("display-none")
      if(shoppingCartElements[i].id === "productInfoContainer") {
        for (let i = 0; i < emptyCartButtons.length; i++) {
          emptyCartButtons[i].classList.remove("display-none")
        }
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
          //console.log(this.state.shoppingcart)
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
    //console.log(found.name)
    this.removeEmpty(cart,found.name)
    if (found.qty >= 1) {
     
      found.qty -= 1
     if(found.qty === 0) {
       //console.log(found.id)
    
     }
      //console.log(found.qty)
      this.updateCartOverallQuantity(-1)
      
    }
    this.setState({shoppingcart: cart})
  }

  removeEmpty(cart,name) {
   for (let i = 0; i < cart.length; i++) {
     if(cart[i].name === name && cart[i].qty-1 === 0) {
        let id = cart.indexOf(cart[i])
        cart.splice(id,1)
     }
   }
  }

  updateCartOverallQuantity(amount) {
    if ("shoppingCartOverallQuantity" in localStorage) {
      let retrievedData = localStorage.getItem("shoppingCartOverallQuantity");
      //console.log(retrievedData)
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
          <button id="emptyCartButton" type="button" className="btn btn-primary emptyCartButtons" onClick={() => {
            localStorage.removeItem("shoppingCart")
            localStorage.removeItem("shoppingCartOverallQuantity")
            this.setState({shoppingcart: []})
            }}>Tyhjennä ostoskori</button>
            <button className="btn btn-primary emptyCartButtons nextButton" onClick={() => toNextTab("productInfo")}>Seuraava</button>
        </div>
      </div>
    )
  }
}

export default App