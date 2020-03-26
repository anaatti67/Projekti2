import React, { Component } from 'react';
import ShoppingCart from './ShoppingCart'
import Admin from './Admin'
import { Route, BrowserRouter, NavLink } from 'react-router-dom'
import Store from './Store';


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
            <NavLink className="nav-item nav-link" to="/cart">Ostoskori</NavLink>
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
                      <Route exact path="/" component={ShoppingCart} />
                      <Route exact path="/store" component={Store} />
                      <Route exact path="/admin" component={Admin} />
                      <Route exact path="/cart" component={ShoppingCart} />
                    </div>
                  </BrowserRouter>
                </div>
    }
}
export default App