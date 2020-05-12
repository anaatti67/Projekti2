import React, { Component } from 'react';
import fire from './config/fire';
import '../css/Footer.css'


class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }



  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        this.props.history.push("/");
        console.log(u)
    }).catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
       <div className="col-md-6 loginbody">
       <form>
      <div className="form-group">
       <label htmlFor="exampleInputEmail1">Sähköpostiosoite</label>
       <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Syötä sähköposti" />
       <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
       <div className="form-group">
      <label htmlFor="exampleInputPassword1">Salasana</label>
      <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Salasana" />
      </div>
      <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
 </form>
 
 </div>
    );
  }
}
export default Login;