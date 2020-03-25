'use strict'
const express = require('express')
const app = express()
// Parse HTTP Body to json
app.use(express.json())
// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})
// This is just real dummy autoincrement
let numberOfProducts = 1
class Product {
  constructor (name, price, stock) {
    this.id = numberOfProducts++
    this.name = name
    this.price = price
    this.stock = stock
  }
}
// Database
let database = [new Product('Macbook Pro', 5000, 1),
  new Product('Lenovo', 200, 200),
  new Product('iPad Pro', 500, 100),
  new Product('Apple Watch', 500, 20)]
// GET ALL
//   curl http://localhost:8080/products
app.get('/products', (req, res) => {
  res.send(database)
})
// GET ONE
//   curl http://localhost:8080/products/1
app.get('/products/:urlId([0-9]+)', (req, res) => {
  const urlId = Number(req.params.urlId)
  let foundProduct = null
  database.forEach((product) => {
    if (product.id === urlId) {
      foundProduct = product
    }
  })
  // If the product was found, return it, otherwise use 404.
  if (foundProduct != null) {
    res.send(foundProduct)
  } else {
    res.status(404)
    res.end()
  }
})
// DELETE ONE
//   curl -X DELETE http://localhost:8080/products/1
app.delete('/products/:urlId([0-9]+)', (req, res) => {
  const urlId = Number(req.params.urlId)
  let index = -1
  for (let i = 0; i < database.length; i++) {
    if (database[i].id === urlId) {
      index = i
    }
  }
  // If item was found, delete it, return 204 "no content", otherwise 404
  if (index !== -1) {
    database.splice(index, 1)
    res.status(204)
    res.end()
  } else {
    res.status(404)
    res.end()
  }
})
// ADD ONE
//   curl -H "Content-type: application/json" -X POST -d "{\"name\": \"Apple TV\", \"price\": 120, \"stock\": 1}" http://localhost:8080/products
app.post('/products', (req, res) => {
  let item = req.body
  let newProduct = new Product(item.name, item.price, item.stock)
  database.push(newProduct)
  res.status(201)
  res.send(newProduct)
})
const server = app.listen(8080, () => {
  console.log(`Listening on port ${server.address().port}`)
})

/*

curl -d '{"name": "Apple TV", "price": 120, "stock": 1}' -H "Content-Type: application/json" -X POST http://localhost:8080/products


*/