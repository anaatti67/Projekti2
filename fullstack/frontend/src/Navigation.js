import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import './css/Navi.css'
import { CartListener } from './cartlistener/cartlistener'


export class Navi extends Component {
    constructor(props) {
        super(props)
        this.signout = props.signout
        this.handleCartQtyChanges = props.handleCartQtyChanges
        this.clearCart = props.clearCart
        this.state = { loggedIn: props.loggedIn, admin: props.admin, cart: props.cart, cartQty: props.cartQty }
        this.changeSearchValue = this.changeSearchValue.bind(this)
    }
    static getDerivedStateFromProps(props, state) {
        if (props.cartQty !== state.cartQty) {
            return { cartQty: props.cartQty, cart: props.cart }
        }
        if (props.loggedIn !== state.loggedIn || props.admin !== state.admin ) {
            let localstoragedata = JSON.parse(localStorage.getItem("user"))
            if (localstoragedata !== null && localstoragedata.admin) {
                return {
                    loggedIn: props.loggedIn, admin: true
                }
            } else {
                return {
                    loggedIn: props.loggedIn, admin: false
                }
            }
            
        } 
        
        return null
    }
    componentDidMount() {
        this.setState({ searchString: '' }) 
    }
    changeSearchValue(event) {
        this.setState({ searchString: event.target.value })
    }

    render() {
        return (
        <Navbar  bg="light" expand="md">
        <Navbar.Brand>
            <NavLink className="nav-item nav-link" to="/">KTVO</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
          
            <NavLink className="nav-item nav-link" to={{
                pathname: "/store",
                state: {
                    filterString: ''
                }}}>Kauppa</NavLink>

            {this.state.admin ? <NavLink className="nav-item nav-link" to="/admin">Admin</NavLink> : ''}

            <NavLink className="nav-item nav-link" to="/cart">Ostoskori</NavLink>

          </Nav>
          <CartListener handleCartQtyChanges={this.handleCartQtyChanges.bind(this)} cart={this.state.cart} 
                cartQty={this.state.cartQty} clearCart={this.clearCart} />
          <Form inline onSubmit={e => { e.preventDefault(); }}>
            <FormControl type="text" placeholder="Hae" className="mr-sm-2" 
                onChange={this.changeSearchValue} />
                <Link to={{
                    pathname: "/store",
                    state: {
                        filterString: this.state.searchString
                    }
                    }}>
                    <Button variant="outline-success" type="submit">Haku</Button>
                </Link>
            <Nav className="flex-column">
            {this.state.loggedIn ? 
                    <Button onClick={() => this.signout()}>Kirjaudu ulos</Button>
                :
                <div>
                    <NavLink className="nav-item nav-link signinregister" to="/login">Kirjaudu sisään</NavLink>
                    <NavLink className="nav-item nav-link signinregister" to="/signup">Rekisteröidy</NavLink>
                </div>
            }
              
            </Nav>
          </Form>
        </Navbar.Collapse>
      </Navbar>
        )
    }
}