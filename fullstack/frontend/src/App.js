import React, { Component } from 'react';
import ShoppingCart from './ShoppingCart'
import Admin from './Admin'
import { Route, BrowserRouter } from 'react-router-dom'
import Store from './Store';
import Login from './auth/login'
import SignUp from './auth/signup'
import LandingPage from './LandingPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navi } from './Navigation'
//import CartListener from './CartListener'


class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        user: {},
      }
    }

    componentDidMount() {
      this.authListener()
    }

    authListener() {
      fire.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          this.setState({user})
          //localStorage.setItem('user', user.id)
        } else {
          this.setState({user: null})
          //localStorage.removeItem('user')
        }
      })
    }
    render() {
        return <div>
                  <BrowserRouter basename='/~c8ityrkk/ktvo/'>
                  <div>
                      <Navi/>              
                      <Route exact path="/" component={LandingPage} />
                      <Route exact path="/store" component={Store} />
                      <Route exact path="/admin" component={Admin} />
                      <Route exact path="/cart" component={ShoppingCart} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={SignUp} />
                    </div>
                  </BrowserRouter>
                </div>
    }

    

}
export default App