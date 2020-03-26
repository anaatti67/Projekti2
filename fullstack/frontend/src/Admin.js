import React, { Component } from 'react';

class Admin extends Component {
    constructor(props) {
        super(props)
        this.add = this.add.bind(this)
        this.whenFormChanges = this.whenFormChanges.bind(this)
        this.item = {name: '', price: '', stock: 1}
    }
    add() {
        //let item = {name: 'iMac Pro', price: 4000, stock: 1}
        let configuration = {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(this.item)
        }
        fetch('http://localhost:8080/products', configuration).then((httpResponse) => {
            if(httpResponse.status === 201) {
                alert('Added!')
            }
        })
    }

    whenFormChanges(event) {
        console.log(event.target.name)
        console.log(event.target.value)
        if (event.target.name === 'name') {
            this.item.name = event.target.value
        } else if (event.target.name === 'price') {
            this.item.price = event.target.value
        } else if (event.target.name === 'stock') {
            this.item.stock = event.target.value
        }
        console.log(this.item)
        
    }
    render() {
        return (
            <div className="container">
                <h1 className="mt-5">Admin</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input type="text" onChange={this.whenFormChanges} name="name" className="form-control" id="name" placeholder="iMac Pro"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Product Price</label>
                        <input type="number" onChange={this.whenFormChanges} name="price" className="form-control" id="price" placeholder="4000"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Stock Amount</label>
                        <input type="number" onChange={this.whenFormChanges} name="stock" className="form-control" id="stock" placeholder="0"/>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.add}>Add</button>
                </form>
            </div>
        )
    }
}
export default Admin