import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends Component {
  render () {
    return (
      <form>
        <div className="form-group" align="center" color="blue">
          <h3>Kirjaudu sisään</h3>
        
          <div className="form-group ">
            <label>Sähköposti: </label>
            <input type="email" className="" placeholder="PenttiMalaste@gmail.com" />
          </div>

          <div className="form-group">
            <label>Salasana: </label>
            <input type="password" className="" placeholder="Syötä salasana" />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="" id="customCheck1" />
              <label className="" /* Muistakaa minut voi toteuttaa jos jaksaa */ htmlFor="customCheck1">Muista minut</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Lähetä</button>
          <p className="">
              Unohtuiko <a href="/#">Salasana?</a>
          </p>
        </div>
      </form>
    )
  }
}

export default Login