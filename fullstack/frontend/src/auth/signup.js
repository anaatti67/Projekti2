import React, { Component } from 'react';
import fire from './config/fire';
import './signup.css'

class SignIn extends Component {
  constructor(props) {
    super(props);
    //this.login = this.login.bind(this);
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
      postal: '',
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
      this.props.history.push("/");

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
      <div className="col-md-6 signbody">
        <form>
          <div className="form-group">
            <label htmlFor="emailinput">Sähköpostiosoite</label>
            <input value={this.state.email} onChange={this.handleChange} 
              type="text" name="email" className="form-control" 
              id="emailinput" aria-describedby="emailHelp" placeholder="Syötä sähköposti" 
              pattern="[A-Za-zåäöÅÄÖ0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Esimerkiksi matti@gmail.com"/>
            <small id="emailHelp" className="form-text text-muted">Emme ikinä jaa sähköpostiosoitettasi muille.</small>
          </div>
          <div className="form-group">
            <label htmlFor="passwordinput">Salasana</label>
            <input value={this.state.password} onChange={this.handleChange} 
              type="password" name="password" className="form-control" 
              id="passwordinput" placeholder="Salasana" />
              <small id="emailHelp" className="form-text text-muted">Emme ikinä jaa salasanaasi muille.</small>
          </div>
          <div className="form-group">
            <label htmlFor="confirmpasswordinput">Salasana uudestaan</label>
            <input value={this.state.confirmpassword} onChange={this.handleChange} 
              type="password" name="confirmpassword" className="form-control" 
              id="confirmpasswordinput" placeholder="Vahvista salasana"
              pattern={this.state.password}
              title="Varmistathan että salasanasi täsmää"/>
          </div>
          <div className="form-group">
            <label htmlFor="firstinput">Etunimi</label>
            <input value={this.state.firstname} onChange={this.handleChange} 
              type="text" name="firstname" className="form-control" 
              id="firstinput" placeholder="Etunimi" 
              pattern="[a-zA-ZåäöÅÄÖ-]{2,20}"
              title="Nimi ei saa sisältää numeroita tai merkkejä"/>
          </div>
          <div className="form-group">
            <label htmlFor="lastinput">Sukunimi</label>
            <input value={this.state.lastname} onChange={this.handleChange} 
              type="text" name="lastname" className="form-control" 
              id="lastinput" placeholder="Sukunimi" 
              pattern="[a-zA-ZåäöÅÄÖ-]{2,50}"
              title="Sukunimi ei saa sisältää numeroita tai merkkejä"/>
          </div>
          <div className="form-group">
            <label htmlFor="streetinput">Katuosoite</label>
            <input value={this.state.street} onChange={this.handleChange} 
              type="text" name="street" className="form-control" 
              id="streetinput" placeholder="Katuosoite" 
              pattern="[0-9a-zA-ZåäöÅÄÖ - '']{2,50}"
              title="Katuosoite ei saa sisältää erikoismerkkejä"/>
          </div>
          <div className="form-group">
            <label htmlFor="posta">Postinumero</label>
            <input value={this.state.postal} onChange={this.handleChange} 
              type="text" name="postal" className="form-control" 
              id="postal" placeholder="Postinumero" 
              pattern="[0-9]{5}"
              title="Postinumero ei voi sisältää kirjaimia eikä erikoismerkkejä"/>
          </div>
          <div className="form-group">
            <label htmlFor="city">Kaupunki</label>
            <input value={this.state.city} onChange={this.handleChange} 
              type="text" name="city" className="form-control" 
              id="city" placeholder="Kaupunki" 
              pattern="[a-zA-Z åäöÅÄÖ - ' ']{4,35}"
              title="Kaupungin nimi ei voi sisältää erikoismerkkejä eikä numeroita"/>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Puhelinnumero</label>
            <input value={this.state.phone} onChange={this.handleChange} 
              type="tel" name="phone" className="form-control" 
              id="phone" placeholder="Puhelinnumero" 
              pattern="[0-9+]{10,13}"
              title="Vain numeroita ja +358 alku on hyväksytty"/>
          </div>
        <p>{this.state.validationInfo}</p>
        </form>
        <button type="submit" value="Submit" onClick={this.validate} className="btn btn-success">Signup</button>
        
      </div>
    );
  }
}
export default SignIn;