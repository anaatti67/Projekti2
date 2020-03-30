import React, { Component } from 'react';
import ShoppingCart from './ShoppingCart'
import Admin from './Admin'
import { Route, BrowserRouter, NavLink } from 'react-router-dom'
import Store from './Store';
import Login from './components/login/login.component'
import SignUp from './components/signup/signup.component'
import LandingPage from './LandingPage'
import 'bootstrap/dist/css/bootstrap.min.css';
//import CartListener from './CartListener'


// Add Navigation here
const Navi = () => {
    return (
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
        <a className="navbar-brand" href="/#">KTVO</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-item nav-link" to="/store">Kauppa</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item nav-link" to="/admin">Admin</NavLink>
          </li>
          
        </ul>
        <ul className="navbar-nav ml-auto">
          <li>
            <NavLink className="nav-item nav-link" to="/cart">Ostoskori - </NavLink>
          </li>
          <li>
            <NavLink className="nav-item nav-link" to="/login">Kirjaudu sisään</NavLink>
          </li>
          <li>
            <NavLink className="nav-item nav-link" to="/signup">Rekisteröidy</NavLink>
          </li>
        </ul>
      </nav>
      )
  }

class App extends Component {
    render() {
        return <div>
                  <BrowserRouter>
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