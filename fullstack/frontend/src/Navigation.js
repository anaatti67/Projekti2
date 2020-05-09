import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import './css/Navi.css'
import { CartListener } from './cartlistener/cartlistener'


export class Navi extends Component {

    constructor(props) {
        super(props)
        this.handleCartQtyChanges = props.handleCartQtyChanges
        this.state = {loggedIn: props.loggedIn}
        this.changeSearchValue = this.changeSearchValue.bind(this)
        console.log(this.state)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.loggedIn !== state.loggedIn) {
            return {
                 loggedIn: props.loggedIn
              }
        }console.log(state.loggedIn)
      }
    componentDidMount() {
        this.setState({ searchString: '' })
        console.log(localStorage.getItem('admin'))
        
    }
    changeSearchValue(event) {
        this.setState({ searchString: event.target.value })
    }
    
    /*checkAdmin() {
        //if(localStorage.getItem('admin') === 'true'){
        if(this.props.loggedIn === true){
        console.log("bööö")
        this.setState({loggedIn: <NavLink className="nav-item nav-link" to="/admin" refresh = "true" >Admin (Muokkaa sisältöä) </NavLink>})
        console.log(this.state)
         
        } else {
            console.log('not wörkin')
        }
    }
    */

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

            {this.state.loggedIn ? (<NavLink className="nav-item nav-link" to="/admin" refresh = "true" >Admin (Muokkaa sisältöä) </NavLink>) : ''}

            <NavLink className="nav-item nav-link" to="/cart">Ostoskori</NavLink>

          </Nav>
          <CartListener handleCartQtyChanges={this.handleCartQtyChanges.bind(this)} />
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
              <NavLink className="nav-item nav-link signinregister" to="/login">Kirjaudu sisään</NavLink>
              <NavLink className="nav-item nav-link signinregister" to="/signup">Rekisteröidy</NavLink>
            </Nav>
          </Form>
        </Navbar.Collapse>
      </Navbar>
        )
    }
}