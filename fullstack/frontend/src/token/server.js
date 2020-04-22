// for building rest api
const express = require("express")
//parses the request
const bodyParser = require("body-parser")
//Middleware that enables cors
const cors = require("cors")

const app = express()

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