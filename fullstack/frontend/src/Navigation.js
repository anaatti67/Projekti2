import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import './css/Navi.css'

export class Navi extends Component {

    constructor(props) {
        super(props)
        this.state = {  }
        this.changeSearchValue = this.changeSearchValue.bind(this)
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
          
            <NavLink className="nav-item nav-link" to="/admin">Admin</NavLink>
          
            <NavLink className="nav-item nav-link" to="/cart">Ostoskori</NavLink>

          </Nav>
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