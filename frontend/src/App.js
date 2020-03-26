import React from 'react'
import './App.css'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './Components/login/login.component'
import SignUp from './Components/signup/signup.component'

function App () {
  return (<Router>
    <div className="App">

      <div className="">
        <Link className="" to={'/sign-in'}></Link>

        <Link className="" to={'/sign-in'}>Kirjaudu sisään</Link>

        <Link className="" to={'/sign-up'}>Rekisteröidy</Link>

      </div>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
    </div></Router>

  )
}

export default App
