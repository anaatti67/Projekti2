import React, { Component } from 'react'

class Login extends Component {
  render () {
    return (
      <form>
        <h3>Kirjaudu sisään</h3>

        <div className="">
          <label>Sähköposti: </label>
          <input type="email" className="" placeholder="PenttiMalaste@gmail.com" />
        </div>

        <div className="">
          <label>Salasana: </label>
          <input type="password" className="" placeholder="Syötä salasana" />
        </div>

        <div className="">
          <div className="">
            <input type="checkbox" className="" id="customCheck1" />

            <label className="" /* Muistakaa minut voi toteuttaa jos jaksaa */ htmlFor="customCheck1">Muista minut</label>
          </div>
        </div>

        <button type="submit" className="">Lähetä</button>
        <p className="">
            Unohtuiko <a href="/#">Salasana?</a>
        </p>
      </form>
    )
  }
}

export default Login