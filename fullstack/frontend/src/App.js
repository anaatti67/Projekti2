import React, { Component } from 'react';
import ShoppingCart from './ShoppingCart'
import Admin from './Admin'
import { Route, BrowserRouter } from 'react-router-dom'
import Store from './Store';
import Login from './components/login/login.component'
import SignUp from './components/signup/signup.component'
import LandingPage from './LandingPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navi } from './Navigation'
//import CartListener from './CartListener'


class App extends Component {
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