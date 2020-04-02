import React, { Component } from 'react'

class SignUp extends Component {
  render () {
    return (
      <form className="form-group" align="center">
        <h3>Rekisteröidy</h3>

        <div className="form-group">
          <label>Etunimi: </label>
          <input type="text" className="" placeholder="Pentti" />
        </div>

        <div className="form-group">
          <label>Sukunimi: </label>
          <input type="text" className="" placeholder="Malaste" />
        </div>

        <div className="form-group">
          <label>Sähköposti: </label>
          <input type="email" className="" placeholder="PenttiMalaste@gmail.com" />
        </div>

        <div className="form-group">
          <label>Salasana: </label>
          <input type="password" className="" placeholder="Syötä salasana" />
        </div>

        <button type="submit" className="btn btn-primary">Sign Up</button>
        <p className="">
                Oletko jo rekisteröitynyt? <br/>
                <a href="/login">Kirjaudu sisään</a>
        </p>
      </form>
    )
  }
}

export default SignUp