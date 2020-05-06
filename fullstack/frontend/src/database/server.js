
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
    user: 'c7anpelt',
    password: 'Ticojakapu17',
    database: 'dbc7anpelt1'
});


connection.connect(err => {
    if(err) {
        return err;
    }
});

app.get('/store',(req, res) => {
    connection.query(SELECT_ALL_PRODUCTS, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
           return res.send(results);
            }
        });
}); 

app.use('/admin',(req, res) => {
    
let productName = req.body.name
let productDescription = req.body.description;
let productPrice = req.body.price
let productStock = req.body.stock
let productCategory = req.body.category
if(productCategory !== '') {
    let sqlStatement = 'INSERT INTO Products (Name, Description, Price, Stock, Category) VALUES (' + mysql.escape(productName) + ',' + mysql.escape(productDescription) + ',' + mysql.escape(productPrice) + ',' + mysql.escape(productStock) + ',' + mysql.escape(productCategory) + ')';
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
    return
}
}); 




app.listen(8080, () => {
console.log('Server running on port 8080');
});
