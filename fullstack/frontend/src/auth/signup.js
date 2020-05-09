import React, { Component } from 'react';
import fire from './config/fire';

class SignIn extends Component {
  constructor(props) {
    super(props);
    // this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {
      validationInfo: '',
      email: '',
      password: '',
      confirmpassword: '',
      firstname: '',
      lastname: '',
      street: '',
      postal: 0,
      city: '',
      phone: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  validate(e) {
    if (this.state.password === this.state.confirmpassword && this.state.password.length > 5) {
        console.log('ok')
        this.signup(e)
    } else {
        console.log('nope')
        this.setState({validationInfo: 'Salasanat eivät täsmää tai ovat liian lyhyitä'})
    }
  }
  signup(e){
      e.preventDefault();
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        console.log(u)
        fire.database().ref('users/' + u.user.uid).set({
          email: this.state.email,
          firstname: this.state.firstname,
          lastname: this.state.lastname,  
          street: this.state.street,
          postal: this.state.postal,
          city: this.state.city,
          phone: this.state.phone
        })
      }).catch((error) => {
          console.log(error);
      })
   
  }
  render() {
    return (
      <div className="col-md-6">
        <form>
          <div className="form-group">
            <label htmlFor="emailinput">Sähköpostiosoite</label>
            <input value={this.state.email} onChange={this.handleChange} 
              type="email" name="email" className="form-control" 
              id="emailinput" aria-describedby="emailHelp" placeholder="Syötä sähköposti" />
            <small id="emailHelp" className="form-text text-muted">Emme ikinä jaa sähköpostiosoitettasi muille.</small>
          </div>
          <div className="form-group">
            <label htmlFor="passwordinput">Salasana</label>
            <input value={this.state.password} onChange={this.handleChange} 
              type="password" name="password" className="form-control" 
              id="passwordinput" placeholder="Salasana" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmpasswordinput">Salasana</label>
            <input value={this.state.confirmpassword} onChange={this.handleChange} 
              type="password" name="confirmpassword" className="form-control" 
              id="confirmpasswordinput" placeholder="Vahvista salasana" />
          </div>
          <div className="form-group">
            <label htmlFor="firstinput">Etunimi</label>
            <input value={this.state.firstname} onChange={this.handleChange} 
              type="text" name="firstname" className="form-control" 
              id="firstinput" placeholder="Etunimi" />
          </div>
          <div className="form-group">
            <label htmlFor="lastinput">Sukunimi</label>
            <input value={this.state.lastname} onChange={this.handleChange} 
              type="text" name="lastname" className="form-control" 
              id="lastinput" placeholder="Sukunimi" />
          </div>
          <div className="form-group">
            <label htmlFor="streetinput">Katuosoite</label>
            <input value={this.state.street} onChange={this.handleChange} 
              type="text" name="street" className="form-control" 
              id="streetinput" placeholder="Katuosoite" />
          </div>
          <div className="form-group">
            <label htmlFor="postal">Postinumero</label>
            <input value={this.state.postal} onChange={this.handleChange} 
              type="number" name="postal" className="form-control" 
              id="postal" placeholder="Postinumero" />
          </div>
          <div className="form-group">
            <label htmlFor="city">Kaupunki</label>
            <input value={this.state.city} onChange={this.handleChange} 
              type="text" name="city" className="form-control" 
              id="city" placeholder="Kaupunki" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Puhelinnumero</label>
            <input value={this.state.phone} onChange={this.handleChange} 
              type="tel" name="phone" className="form-control" 
              id="phone" placeholder="Puhelinnumero" />
          </div>
        <p>{this.state.validationInfo}</p>
        
        </form>
        <button onClick={this.validate} className="btn btn-success">Signup</button>
      </div>
    );
  }
}
export default SignIn;