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
  console.log(cart)
  setShoppingCartChoices(cart, totalSum)
  let tab = cart.map((item) => 
              <tr key={item.id} id={item.id}>
                  <td className="mobileStyleName">{item.name}</td>
                  <td>{item.price} €</td>
                  <td>{item.qty}</td>
                  <td>
                    {props.checkStock(item.id, item.qty) ?
                    <button type="button" className="btn btn-primary addBtn" onClick={() => { 
                        props.add(item.id)
                        }}>
                        Lisää
                    </button> 
                    :
                    ''}
                    <button  type="button" className="btn btn-primary removeBtn" onClick={() => { 
                        props.remove(item.id)}}>
                        Poista
                    </button>
                    
                  </td>
              </tr>)
            
  return (
        <div className="theShoppingCart">
          <div className="shoppingCartNavBar">
           <button id="productInfo" className="shoppingCartNavButton productInfo activeTab disabled" onClick={() => activeTab("productInfo")}></button>
           <div className="connectionLine"></div>
           <button id="userInfo" className="shoppingCartNavButton userInfo disabled" onClick={() => activeTab("userInfo")}></button>
           <div className="connectionLine"></div>
           <button id="deliveryInfo" className="shoppingCartNavButton deliveryInfo disabled" onClick={() => activeTab("deliveryInfo")}></button>
           <div className="connectionLine"></div>
           <button id="paymentInfo" className="shoppingCartNavButton paymentInfo disabled" onClick={() => activeTab("paymentInfo")}></button>
           <div className="connectionLine"></div>
           <button id="summaryInfo" className="shoppingCartNavButton summaryInfo disabled" onClick={() => activeTab("summaryInfo")}></button>
          </div>
          <div id="productInfoContainer" className="shoppingCartElement">
          <table className="table">
            <thead>
              <tr className="shoppingcartMobileTitles">
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
                <td className="mobileStyleTotalPrice">{totalSumString}</td>
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
                        <input id="email1" className="formInput" placeholder="example@gmail.com" type="text"/>

                        <label htmlFor="email2">Sähköpostiosoite uudelleen</label>
                        <input id="email2" className="formInput" type="text" placeholder="example@gmail.com"/>

                        <label htmlFor="address">Katuosoite</label>
                        <input id="address" className="formInput" type="text" placeholder="Esimerkkikatu 4"/>

                        <label htmlFor="postaddress">Postiosoite</label>
                        <input id="postaddress" className="formInput" type="text" placeholder="12345"/>

                    </div>
                    <div id="halfForm2">
                    <label htmlFor="fname">Etunimi</label>
                        <input id="fname" className="formInput" type="text" placeholder="kirjoita etunimesi"/>

                        <label htmlFor="lname">Sukunimi</label>
                        <input id="sname" className="formInput" type="text" placeholder="kirjoita sukunimesi"/>

                        <label id="phonenumberLabel" htmlFor="phone">Puhelinnumero</label>
                        <input id="phone" className="formInput" type="text" placeholder="kirjoita puh.numerosi"/>
                    </div>
                   
              </div>
                </form>
          </div>
          <button id="userInfoButton" type="button" className="btn btn-primary userInfoButton display-none" onClick={() => toNextTab("userInfo")}>Seuraava</button>
          
          <div id="deliveryInfoContainer" className="shoppingCartElement display-none">
            <h3>Valitse Toimitustapa</h3>
            <div className="deliveryOptionsContainer">
              <div className="deliveryOption">
              <label htmlFor="delivery1">Kuljetus noutopisteesen</label>
              <input type="checkbox"  name="Kuljetus noutopisteesen" className="deliveryInput" onClick={(e) => checkHandler(e)}/>
              </div>
             
            <div className="deliveryOption">
            <label htmlFor="delivery2">Kuljetus lähimpään postiin</label>
            <input type="checkbox" name="Kuljetus lähimpään postiin" className="deliveryInput" onClick={(e) => checkHandler(e)}/>
            </div>

            <div className="deliveryOption">
            <label htmlFor="delivery3">Kuljetus kotiin</label>
              <input type="checkbox" name="Kuljetus kotiin" className="deliveryInput" onClick={(e) => checkHandler(e)}/>
            </div>
            
            
            </div>
           <button className="btn btn-primary deliveryInfoButton" onClick={() => toNextTab("deliveryTab")}>Seuraava</button>
          </div>

          <div id="paymentInfoContainer" className="shoppingCartElement display-none">
              <div className="paymentOption optionBank">
                <h3>Verkkopankki</h3>
                <div className="bankImages">
                  <button id="op" name="OP pohjola" className="paymentOptionButton op"  onClick={(e) => selectedPayment(e)}></button>
                  <button id="nordea" name="Nordea" className="paymentOptionButton nordea" onClick={(e) => selectedPayment(e)}></button>
                  <button id="danskebank" name="Danske Bank" className="paymentOptionButton danskebank" onClick={(e) => selectedPayment(e)}></button>
                  <button id="spankki" name="S-Pankki" className="paymentOptionButton spankki" onClick={(e) => selectedPayment(e)}></button>
                  <button id="aktia" name="Aktia" className="paymentOptionButton aktia" onClick={(e) => selectedPayment(e)}></button>
                </div>
              </div>

              <div className="paymentOption optionCard">
                <h3>Maksukortti</h3>
                <div className="cardImages">
                  <button id="visa" name="Visa" className="paymentOptionButton visa" onClick={(e) => selectedPayment(e)}></button>
                  <button id="mastercard" name="Master Card" className="paymentOptionButton mastercard"onClick={(e) => selectedPayment(e)}></button>
                  <button id="verifone" name="Verifone" className="paymentOptionButton verifone"onClick={(e) => selectedPayment(e)}></button>
                  <button id="americanExpress" name="American Express" className="paymentOptionButton americanExpress"onClick={(e) => selectedPayment(e)}></button>
                 
                </div>
                <button className="btn btn-primary paymentInfoButton" onClick={() => toNextTab("paymentInfo")}>Seuraava</button>
              </div>
          </div>

          <div id="summaryInfoContainer" className="shoppingCartElement display-none">
              <div className="itemSummaryContainer">
                <h3 className="summaryInformativeTitle">Vahvista tilauksen tiedot</h3>
                <div id="itemSummaryContainer">
                </div>
              </div>
              <div className="userInfoSummaryContainer">
              <h3 className="summaryInformativeTitle">Vahvista tilaajan tiedot</h3>
              <div id="userSummaryContainer">
             
                </div>
                <button className="btn btn-primary transActionEndButton" onClick={() => endTransaction(cart)}>Siirry maksamaan</button>
                </div>
          </div>
          <div id="tilausvahvistus" className="display-none">Testi</div>
        </div>
        )
}

function endTransaction(cart) {
  sendEmail()
  removeProductsFromStock(cart)
}

// Added by Ilmari, removes products from database after succesful order
function removeProductsFromStock(cart) {
  const url = 'https://ktvo.herokuapp.com/removeProductsFromStock'
  for (let item of cart) {
    let body = { id: item.id, qty: item.qty }
    let configuration = {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(body)
    }
    fetch(url, configuration).then(r => r.json()).then((response) => {
        console.log(response);
    }) 
  }
}

function sendEmail() {
  console.log("Email sent")
  var link = "mailto:" + currentShoppingCartChoices.userInfo.s_post
  + "?cc=''" // CC
  + "&subject=" + escape("Tilausvahvistus (opiskelijoiden verkkokauppa)") //otsikko
  + "&body=" + escape(document.getElementById('tilausvahvistus').innerHTML) //viesti
;

window.location.href = link;
}

var currentShoppingCartChoices
function setShoppingCartChoices(shoppingcart, totalSum) {
  currentShoppingCartChoices = {
 items: shoppingcart,
 totalPrice: totalSum,
 userInfo: {
   s_post: "",
   f_name: "",
   s_name: "",
   p_nro: "",
   post_address: "",
   address: ""
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
  if(tabName === "userInfo") {
    //hae käyttäjän tiedot ja esitäytä jos löytyy
    checkForm()
  }

  if(tabName === "deliveryTab") {
    let checkboxes = document.querySelectorAll(".deliveryInput")
    let checkedBoxes = 0;
    for (let i = 0; i < checkboxes.length; i++) {
      if(checkboxes[i].checked === true) {
        currentShoppingCartChoices.delivery_method = checkboxes[i].name
       checkedBoxes++
      }
    }
    if(checkedBoxes === 0) {
      alert("Valitse toimitustapa")
    } else {
      activeTab("paymentInfo")
    }
  }

  if(tabName === "productInfo") {
    console.log("Checking current Shoppingcart choices..")

    if(currentShoppingCartChoices.items.length === 0) {
      alert("Ostoskori on tyhjä")
    } else {
     activeTab("userInfo")
    }
  }

  if(tabName === "paymentInfo") {
    let selectedPayment = document.querySelectorAll(".selectedPaymentMethod")
    if(selectedPayment.length > 0) {
      for (let i = 0; i < selectedPayment.length; i++) {
        console.log(selectedPayment[i])
        currentShoppingCartChoices.payment_method = selectedPayment[i].name
   
      }
      activeTab("summaryInfo")
    } else {
      alert("Select payment method")
    }
  }
}

function checkForm() {
  let inputs = document.querySelectorAll(".formInput")
  let accepted = false
  let email1 = document.getElementById("email1")
  let email2 = document.getElementById("email2")
  var phoneField = document.getElementById("phone")
  console.log(inputs)
  for (let i = 0; i < inputs.length; i++) {
  if(inputs[i].value === "") {
    alert("Täytä kaikki kentät")
    return
  }
 
  if(email1.value !== email2.value) {
    alert("Sähköpostiosoitteet eivät täsmää")
    return
  }

  let validEmail = validateEmail(email1.value)
  if(!validEmail) {
    alert("insert valid email address")
    return
  }
  
 }

  accepted = true
  if(accepted) {
  let fnameField = document.getElementById("fname")
  let snameField = document.getElementById("sname")
  let addressField = document.getElementById("address")
  let postAddressField = document.getElementById("postaddress")
  currentShoppingCartChoices.userInfo.s_post = email1.value
  currentShoppingCartChoices.userInfo.f_name = fnameField.value
  currentShoppingCartChoices.userInfo.s_name = snameField.value
  currentShoppingCartChoices.userInfo.p_nro = phoneField.value
  currentShoppingCartChoices.userInfo.address = addressField.value
  currentShoppingCartChoices.userInfo.post_address = postAddressField.value
  console.log(currentShoppingCartChoices)
  activeTab("deliveryInfo")
}
}

function validateEmail(email) {
  if( /(.+)@(.+){2,}\.(.+){2,}/.test(email) ){
  return true
  } else {
   return false
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

function activeTab(tabName) {
     resetActiveTab()
     let element = document.getElementById(tabName)
     if(tabName === "productInfo") {
      setActiveElement("productInfo")
       element.classList.add("activeTab")
     }
     if(tabName === "userInfo") {
       setActiveElement("userInfo")
       removeDisabled("productInfo")
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

function removeDisabled(id) {
let navButton = document.getElementById(id)
navButton.classList.remove("disabled")
}

function setItemSummary() {
  let element = document.getElementById("itemSummaryContainer")
  let element2 = document.getElementById("userSummaryContainer")
  element.innerHTML = ""
  element2.innerHTML = ""
 for (let i = 0; i < currentShoppingCartChoices.items.length; i++) {
   setItemInfo(currentShoppingCartChoices.items[i], element)
 }
  setTotalPrice(currentShoppingCartChoices,element)
  setUserInfo(currentShoppingCartChoices, element2)
}

function setUserInfo(choices, element) {
 setFname(choices, element)
 setsName(choices, element)
 setAddress(choices,element)
 setPostAddress(choices,element)
 setEmail(choices, element)
 setDelivery(choices, element)
 setPayment(choices, element)
 

}

function setPostAddress(choices,element) {
  let postAddress = document.createElement("p")
  postAddress.classList.add("informativeTextElement")
  postAddress.innerHTML = "<b>Postiosoite: </b>" + choices.userInfo.post_address
  console.log(postAddress)
  element.appendChild(postAddress)
}

function setAddress(choices,element) {
  let address = document.createElement("p")
  address.classList.add("informativeTextElement")
  address.innerHTML = "<b>Katuosoite: </b>" + choices.userInfo.address
  console.log(address)
  element.appendChild(address)
}

function setPayment(choices, element) {
  let payment = document.createElement("p")
  payment.classList.add("informativeTextElement")
  payment.innerHTML = "<b>Maksutapa: </b>" + choices.payment_method
  element.appendChild(payment)
}

function setDelivery(choices, element) {
  let delivery = document.createElement("p")
  delivery.classList.add("informativeTextElement")
  delivery.innerHTML = "<b>Toimitus: </b>"  + choices.delivery_method
  element.appendChild(delivery)
}

function setEmail(choices, element) {
  let email = document.createElement("p")
  email.classList.add("informativeTextElement")
  email.innerHTML = "<b>S-posti: </b>" + choices.userInfo.s_post
  element.appendChild(email)
}

function setsName(choices, element) {
  let sname = document.createElement("p")
  sname.classList.add("informativeTextElement")
  sname.innerHTML = "<b>Sukunimi: </b>" + choices.userInfo.s_name
  element.appendChild(sname)
}

function setFname(choices, element) {
  let fname = document.createElement("p")
  fname.classList.add("informativeTextElement")
  fname.innerHTML = "<b>Etunimi: </b>" + choices.userInfo.f_name
  element.appendChild(fname)
}

function setItemInfo(item, element) {
  setItemTitle(item, element)
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

function setItemTitle(item, element) {
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
  let navButton = document.getElementById(tabName)
  navButton.classList.remove("disabled")
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
        checkIfLoggedIn()
        userInfoButton.classList.remove("display-none")
      }
    } 
  }
}

function checkIfLoggedIn() {
  if(localStorage.user) {
    let user = JSON.parse(localStorage.user)
    let forms = document.querySelectorAll(".formInput")
    console.log(user)
    setUserValues(user, forms)
  } else {
    console.log("Kirjautunutta käyttäjää ei löytynyt")
  }

}

function setUserValues(user, forms) {
  for (let i = 0; i < forms.length; i++) {
   console.log(forms[i].id)
   if(forms[i].id === "email1") {
    forms[i].value = user.email
    forms[i+1].value = user.email
   }
   if(forms[i].id === "address") {
    forms[i].value = user.street
   }
   if(forms[i].id === "postaddress") {
    forms[i].value = user.postal
  }
  if(forms[i].id === "fname") {
    forms[i].value = user.firstname
  }
  if(forms[i].id === "sname") {
    forms[i].value = user.lastname
  }
  if(forms[i].id === "phone") {
    forms[i].value = user.phone
  }

    
  }
  console.log(forms)
}

function disableShoppingcartNavBar() {
  let elements = document.querySelectorAll(".shoppingCartNavButton")
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("disabled")
    
  }
}

// HERE STARTS THE SHOPPING CART COMPONENT

class App extends Component {
  constructor(props) {
    super(props)
    this.handleCartQtyChanges = props.handleCartQtyChanges
    this.clearCart = props.clearCart
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.state = {shoppingcart: props.cart, cartQty: props.cartQty, products: []}
  }

  // Checks if props are changed
  static getDerivedStateFromProps(props, state) {
    if (props.cartQty !== state.cartQty) {
      return {
        cartQty: props.cartQty,
        shoppingcart: props.cart
      }
    } else {
      return null
    }
  }
  componentDidMount() {
    fetch('https://ktvo.herokuapp.com/store').then(r => r.json()).then((products) => {
      this.setState({ products: products })})
  }
  // Adds a product to shopping cart
  add(id) {
    let cart = this.state.shoppingcart
    let found = cart.find(product => product.id === id)
    found.qty++
    this.handleCartQtyChanges(this.state.cartQty + 1, cart)
  }

  // Removes a product from shopping cart
  remove(id) {
    let cart = this.state.shoppingcart
    let found = cart.find(product => product.id === id)
    found.qty--

    // Remove product from shopping cart if quantity <= 0
    if (found.qty <= 0) {
      cart = cart.filter(item => 
        item.id !== found.id
      )
    }
    this.handleCartQtyChanges(this.state.cartQty - 1, cart)
  }
  checkStock(id, cartQty) {
    console.log(id + ', ' + cartQty)
    for (let item of this.state.products) {
        if(item.id === id && item.Stock <= cartQty) {
            return false
        }
    }
    return true
  }
  render() {
    return (
      <div>
        <div className="container cartbody">
          <h1 className="mt-5">Ostoskori</h1>
          <ShoppingCart data={this.state.shoppingcart} add={this.add} remove={this.remove} checkStock={this.checkStock.bind(this)} />
          <button id="emptyCartButton" type="button" className="btn btn-primary emptyCartButtons" onClick={() => {
            if(window.confirm('Really clear the shopping cart?')) {
              this.clearCart()
              disableShoppingcartNavBar()
            }
            }}>Tyhjennä ostoskori</button>
            <button className="btn btn-primary emptyCartButtons nextButton" onClick={() => toNextTab("productInfo")}>Seuraava</button>
        </div>
      </div>
    )
  }
}

export default App