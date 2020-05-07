
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json())

app.use(cors())
const SELECT_ALL_PRODUCTS = 'SELECT * FROM Products';
const connection = mysql.createConnection({
    host: 'mydb.tamk.fi',
    user: 'c6jomust',
    password: 'U6E4ysyN',
    database: 'dbc6jomust62'
});

connection.connect(err => {
    if(err) {
        return err;
    }
});

// Fetches all products from SQL database
app.get('/store',(req, res) => {
    connection.query(SELECT_ALL_PRODUCTS, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
           return res.send(results);
            }
        });
}); 

// Creates a new product
app.use('/add',(req, res) => {
    let productName = req.body.name
    let productDescription = req.body.description;
    let productPrice = req.body.price
    let productStock = req.body.stock
    let productCategory = req.body.category
    if(productCategory !== '') {
        let sqlStatement = 'INSERT INTO Products (Name, Description, Price, Stock, Category) VALUES (' 
            + mysql.escape(productName) + ',' 
            + mysql.escape(productDescription) + ',' 
            + mysql.escape(productPrice) + ',' 
            + mysql.escape(productStock) + ',' 
            + mysql.escape(productCategory) + ')';
        console.log(sqlStatement);
        connection.query(sqlStatement, (err, results) => {
            if(err) {
                return res.send(err);
            } else {
                return res.send(results);
            }
        }); 
    } else {
        console.log("category not found")
        return null
    }
}); 

// Receives a product id and deletes it from the db
app.use('/delete',(req, res) => {
    let productId = req.body.id
    if(productId !== undefined) {
        let sqlStatement = 'DELETE FROM Products WHERE id = ' + mysql.escape(productId);
        console.log(sqlStatement);
        connection.query(sqlStatement, (err, results) => {
            if(err) {
                return res.send(err);
            } else {
                results.message = "Deleted product with id: " + productId
                results.insertId = productId
                return res.send(results);
            }
        }); 
    } else {
        console.log("Delete failed")
        return null
    }
});

// Receives a product object
app.use('/update',(req, res) => {
    let productId = req.body.id
    let productName = req.body.name
    let productDescription = req.body.description;
    let productPrice = req.body.price
    let productStock = req.body.stock
    let productCategory = req.body.category
    if(productId !== undefined) {
        let sqlStatement = 'UPDATE Products SET Name = ' + mysql.escape(productName) +
            ', Description = ' + mysql.escape(productDescription) +
            ', Price = ' + mysql.escape(productPrice) +
            ', Stock = ' + mysql.escape(productStock) +
            ', Category = ' + mysql.escape(productCategory) +
            ' WHERE id = ' + mysql.escape(productId);
        console.log(sqlStatement);
        connection.query(sqlStatement, (err, results) => {
            if(err) {
                return res.send(err);
            } else {
                return res.send(results);
            }
        }); 
    } else {
        console.log("Couldn't update")
        return null
    }
}); 

app.listen(process.env.PORT, () => {
    console.log('Server running on port 8080');
});
