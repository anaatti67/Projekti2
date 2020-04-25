import axios from "axios"

//Url that the api sues
const API_URL = "http://localhost:8080/api/auth/"

class AuthService {
    //Gets username and password from signup page
  login(username, password) {
    return axios
        //creates post with api_url and login data
      .post(API_URL + "login", {
        username,
        password
      })
      //Gets response and if it is succesfull token it saves the token to local storage
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data
      })
  }
  //removes the login token from local storage
  logout() {
    localStorage.removeItem("user")
  }
  // posts regiteration data with api post to mysql
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    })
  }
  //Gets user information
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()