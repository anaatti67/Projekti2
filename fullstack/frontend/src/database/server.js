
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');


app.use(cors());
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

app.get('/products',(req, res) => {
    connection.query(SELECT_ALL_PRODUCTS, (err, results) => {
        if(err) {
            return res.send(err);
        } else {
           return res.json({
                data: results
                })
            }
        });
}); 

app.get('/products/add',(req, res) => {
   
}); 



app.listen(8080, () => {
console.log('Server running on port 8080');
});
