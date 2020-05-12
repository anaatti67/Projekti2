import React, { Component, Fragment } from 'react';
import ShoppingCart from './ShoppingCart'
import Admin from './Admin'
import { Route, BrowserRouter } from 'react-router-dom'
import Store from './Store';
import Login from './auth/login'
import SignUp from './auth/signup'
import fire from 'firebase'
import LandingPage from './LandingPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navi } from './Navigation'
import { Footer } from './Footer'


class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        cartQty: 0, cart: [], loggedIn: false, admin: false
      }
      this.handleCartQtyChanges = this.handleCartQtyChanges.bind(this)
      this.clearCart = this.clearCart.bind(this)
      this.authListener = this.authListener.bind(this)
    }

    // Handles shopping cart changes of child components
    handleCartQtyChanges(qty, cart) {
      if (this.state.cartQty !== qty) {
        this.setState({cartQty: qty, cart: cart})
        localStorage.setItem("shoppingCart", JSON.stringify(this.state.cart));
      }
    }

    // Handles clear shopping cart calls of child components
    clearCart() {
      console.log('Clearing cart')
      localStorage.removeItem("shoppingCart")
      this.setState({ cart: [], cartQty: 0 })
    }

    componentDidMount() {
      this.authListener()
      if ("shoppingCart" in localStorage) {
        let retrievedData = localStorage.getItem("shoppingCart");
  
        if (retrievedData === 'undefined') {
          localStorage.setItem("shoppingCart", JSON.stringify(this.state.cart));
        } else {
          var dataToArray = JSON.parse(retrievedData);
          if (dataToArray != null) {
            let tmpCart = []
            for (let x = 0; x < dataToArray.length; x++) {
              tmpCart.push(dataToArray[x])
            }
            let qty = 0
            for (let item of tmpCart) {
              qty += item.qty
            }
            this.setState({ cart: tmpCart, cartQty: qty })
          }
        }
      } 
    }

    signOut() {
      localStorage.clear()
      console.log('signout')
      fire.auth().signOut().then(function() {
        // Sign-out successful.
        localStorage.removeItem('admin')
        console.log('sign out succesful')
        this.setState({loggedIn:false})
      }).catch(function(error) {
        // An error happened.
        console.log('sign out error: ' + error)
      });
    }

    authListener() {
      fire.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true, user: user })
          var reference = fire.database().ref('users/' + user.uid);
          reference.on('value', (snapshot) => {
            const tmpObj = snapshot.val()
            localStorage.setItem("user", JSON.stringify(tmpObj))
            if (tmpObj.admin) {
              this.setState({ admin: true })
              localStorage.setItem('admin', tmpObj.admin = true)
            } else {
              localStorage.setItem('admin', tmpObj.admin = false)
              this.setState({ admin: false })
            }
          });
        } else {
          this.setState({ loggedIn: false, user: null, admin: false })
        }
      })
    }

    render() {
        return (
            <BrowserRouter basename='/~c8ityrkk/ktvo/'>
            
                <Navi handleCartQtyChanges={this.handleCartQtyChanges}
                    loggedIn={this.state.loggedIn} admin={this.state.admin} clearCart={this.clearCart.bind(this)}
                    signout={this.signOut.bind(this)} cart={this.state.cart} cartQty={this.state.cartQty} />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/store" render={ (props) => <Store {...props}
                    cartQty={this.state.cartQty} cart={this.state.cart} handleCartQtyChanges={this.handleCartQtyChanges} /> } />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/cart" render={ (props) => <ShoppingCart {...props} clearCart={this.clearCart.bind(this)}
                    cartQty={this.state.cartQty} cart={this.state.cart} handleCartQtyChanges={this.handleCartQtyChanges} /> } />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
              <Footer/>
            </BrowserRouter>

        )}

    

}
export default App