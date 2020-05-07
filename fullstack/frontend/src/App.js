import React, { Component } from 'react';
import ShoppingCart from './ShoppingCart'
import Admin from './Admin'
import { Route, BrowserRouter } from 'react-router-dom'
import Store from './Store';
import Login from './auth/login'
import SignUp from './auth/signup'
import fire from 'firebase'
import LandingPage from './LandingPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navi } from './Navigation'

//import CartListener from './CartListener'


class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        loggedIn: false
      }
    }

    componentDidMount() {
      this.authListener()
    }

    signOut() {
      console.log('singout')
      fire.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('sign out succesful')
        this.setState({loggedIn:false})
      }).catch(function(error) {
        // An error happened.
        console.log('sign out error: ' + error)
  
      });
    }

    authListener() {
      fire.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          this.setState({ loggedIn: true, user: user })
          if (user.isAdmin) {
            this.setState({ admin: true })
          } else {
            this.setState({ admin: false })
          }
          var reference = fire.database().ref('users/' + user.uid);

          reference.on('value', function(snapshot) {
            const tmpObj = snapshot.val()
            console.log(tmpObj);
            console.log(tmpObj.username)
            if (tmpObj.admin) {
              console.log('Olen admin')
            } else {
              console.log('En ole admin')
            }
          });

          console.log(this.state)
        } else {
          this.setState({ loggedIn: false, user: null })
        }
      })
    }
    render() {
        return (<div>
                  
                  
                  <button onClick={() => this.signOut()}>Signout</button>
                  {this.state.loggedIn ? (<p>{this.state.user.email}</p>) : (<p>''</p>)}
                  <p> Boolean: {this.state.loggedIn.toString()} </p>
                  <BrowserRouter basename='/~c8ityrkk/ktvo/'>
                  <div>
                      <Navi/>              
                      <Route exact path="/" component={LandingPage} />
                      <Route exact path="/store" component={Store} />
                      <Route exact path="/admin" component={Admin} />
                      <Route exact path="/cart" component={ShoppingCart} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={SignUp} />
                    </div>
                  </BrowserRouter>
                </div>
        )}

    

}
export default App