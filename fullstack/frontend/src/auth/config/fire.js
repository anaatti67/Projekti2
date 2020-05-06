import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB735l5lwr_Gw5lWHR1pdq11egmdxbNXnc",
    authDomain: "projekti2-71fa9.firebaseapp.com",
    databaseURL: "https://projekti2-71fa9.firebaseio.com",
    projectId: "projekti2-71fa9",
    storageBucket: "projekti2-71fa9.appspot.com",
    messagingSenderId: "790125259838",
    appId: "1:790125259838:web:464569aee0c2826aeff56f",
    measurementId: "G-F4JSWV57D9"
  }

const fire = firebase.initializeApp(firebaseConfig)
export default fire
