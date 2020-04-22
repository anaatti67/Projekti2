
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');




app.use(cors());
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

app.get('/products/add',(req, res) => {
   
}); 



app.listen(8080, () => {
console.log('Server running on port 8080');
});
