import React, { Component } from 'react';
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
      this.authListener = this.authListener.bind(this)
    }
    handleCartQtyChanges(qty, cart) {
      //console.log(qty)
      if (this.state.cartQty !== qty) {
        this.setState({cartQty: qty, cart: cart})
      }
    }

    componentDidMount() {
      this.authListener()
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
        //console.log(user)
        if (user) {
          this.setState({ loggedIn: true, user: user })

          /*
          if (user.admin) {
            this.setState({ admin: true })
          } else {
            this.setState({ admin: false })
          }
          */

          var reference = fire.database().ref('users/' + user.uid);

          reference.on('value', (snapshot) => {
            const tmpObj = snapshot.val()
            localStorage.setItem("user", JSON.stringify(tmpObj))
            console.log(tmpObj);
            if (tmpObj.admin) {
              console.log('Olen admin')
              this.setState({ admin: true })
              localStorage.setItem('admin', tmpObj.admin = true)
            } else {
              localStorage.setItem('admin', tmpObj.admin = false)
              console.log('En ole admin')
              this.setState({ admin: false })
            }
          });

          //console.log(this.state)
        } else {
          this.setState({ loggedIn: false, user: null, admin: false })
        }
      })
    }

    render() {
        return (<div>
                  <BrowserRouter basename='/~c8ityrkk/ktvo/'>
                  <div>
                      <Navi handleCartQtyChanges={this.handleCartQtyChanges} 
                          loggedIn={this.state.loggedIn} admin={this.state.admin}
                          signout={this.signOut.bind(this)}/>
                      <Route exact path="/" component={LandingPage} />
                      <Route exact path="/store" component={Store} />
                      <Route exact path="/admin" component={Admin} />
                      <Route exact path="/cart" render={ (props) => <ShoppingCart {...props} 
                          cartQty={this.state.cartQty} cart={this.state.cart} /> } />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={SignUp} />
                      <Footer/>
                    </div>
                  </BrowserRouter>
                </div>
        )}

    

}
export default App