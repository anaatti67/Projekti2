import React, { Component } from 'react'

class SignUp extends Component {
  render () {
    return (
      <form>
        <h3>Rekisteröidy</h3>

        <div>
          <label>Etunimi: </label>
          <input type="text" className="" placeholder="Pentti" />
        </div>

        <div>
          <label>Sukunimi: </label>
          <input type="text" className="" placeholder="Malaste" />
        </div>

        <div>
          <label>Sähköposti: </label>
          <input type="email" className="" placeholder="PenttiMalaste@gmail.com" />
        </div>

        <div>
          <label>Salasana: </label>
          <input type="password" className="" placeholder="Syötä salasana" />
        </div>

        <button type="submit" className="">Sign Up</button>
        <p className="">
                Oletko jo rekisteröitynyt? <br/>
                <a href="/login">Kirjaudu sisään</a>
        </p>
      </form>
    )
  }
}

export default SignUp