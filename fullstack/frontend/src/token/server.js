// for building rest api
const express = require("express")
//parses the request
const bodyParser = require("body-parser")
//Middleware that enables cors
const cors = require("cors")

const app = express()

const db = require("./")

const Role = db.role

var corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

// parse requests application/json
app.use(bodyParser.json())

// parse requests application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to immus shop. What do you need" })
})

// port that is listened
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db')
    initial();
  })

  function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "admin"
    });
  }