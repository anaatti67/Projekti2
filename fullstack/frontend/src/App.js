import React, { Component } from 'react';
import ShoppingCart from './ShoppingCart'
import Admin from './Admin'
import { Route, BrowserRouter, NavLink } from 'react-router-dom'
import Store from './Store';
import Login from './components/login/login.component'
import SignUp from './components/signup/signup.component'
import LandingPage from './LandingPage'
import {Navbar, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
//import CartListener from './CartListener'


// Add Navigation here
const Navi = () => {
    return (
      <Nav className="justify-content-center" >
      <Navbar  bg="light" expand="md">
        <Navbar.Brand href='/'>Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
          
            <NavLink className="nav-item nav-link" to="/store">Kauppa</NavLink>
          
            <NavLink className="nav-item nav-link" to="/admin">Admin</NavLink>
          
            <NavLink className="nav-item nav-link" to="/cart">Ostoskori</NavLink>
          
            <NavLink className="nav-item nav-link" to="/login">Kirjaudu sisään</NavLink>
          
            <NavLink className="nav-item nav-link" to="/signup">Rekisteröidy</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </Nav>
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