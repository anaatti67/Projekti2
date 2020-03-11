import React, { Component } from 'react';
import Store from './Store'
import Admin from './Admin'
import { Route, BrowserRouter, NavLink } from 'react-router-dom'


// Add Navigation here
const Navi = () => {
    return (
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
        <a className="navbar-brand" href="/#">Apple Fanboy Store</a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-item nav-link" to="/store">Store</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-item nav-link" to="/admin">Admin</NavLink>
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
                      <Route exact path="/" component={Store} />
                      <Route exact path="/store" component={Store} />
                      <Route exact path="/admin" component={Admin} />
                    </div>
                  </BrowserRouter>
                </div>
    }
}
export default App