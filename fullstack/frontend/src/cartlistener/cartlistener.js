import React, { Component } from 'react'
import cartImg from '../img/cart.png'

export class CartListener extends Component {
    constructor(props) {
        super(props)
        this.handleCartQtyChanges = props.handleCartQtyChanges
        this.toggle = this.toggle.bind(this)
        this.state = {show: props.show, shoppingCart: []}
    }
    
    toggle() {
        console.log('toggle')
        this.update()
        this.setState({show: !this.state.show})
    }
    update() {
        let retrievedData = ''
        if ("shoppingCart" in localStorage) {
            retrievedData = localStorage.getItem("shoppingCart")
            this.setState({shoppingCart: JSON.parse(retrievedData)})
        }
        console.log(retrievedData)
    }
    changeValue(product, value) {
        let products = this.state.shoppingCart
        for (let prod of products) {
            if (prod.id === product.id) {
                prod.qty += value
                if (prod.qty <= 0) {
                    products = products.filter(item => 
                        prod.id !== item.id
                    ) 
                }
            }
        }
        this.setState({shoppingCart: products})
        localStorage.setItem("shoppingCart", JSON.stringify(products));
    }
    render() {
        let imgStyle = {
            width: '50px',
            marginRight: '1em'
        }
        let style = {
            position: 'fixed',
            zIndex: "10",
            display: "inline-block",
            top: "25%",
            right: '25%',
            background: 'black',
            color: 'white',
            padding: '1em'
        }
        let items = this.state.shoppingCart.map((product) => 
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.qty}</td>
                <td style={{textAlign: 'right'}}>{product.price}</td>
                <td>
                    <button type="button" className="btn btn-secondary" onClick={() => this.changeValue(product, 1)}>+</button>
                    <button type="button" className="btn btn-secondary" onClick={() => this.changeValue(product, -1)}>-</button>
                </td>
            </tr>
        )
        let totalPrice = 0;
        let totalQty = 0;
        for (let product of this.state.shoppingCart) {
            totalPrice += (product.qty * product.price)
            totalQty += product.qty
        }
        this.handleCartQtyChanges(totalQty, this.state.shoppingCart)
        return (
            <div>
                <img alt="Shopping Cart" src={cartImg} style={imgStyle}  onClick={() => this.toggle()} />
                {this.state.show ? 
                <div style={style}>
                    <button type="button" className="btn btn-danger" style={{float: 'right'}} onClick={() => this.toggle()}>X</button>
                    <h5>Ostoskori</h5>
                    <table style={{marginTop: '3em'}}>
                        <thead>
                            <tr>
                                <th>Nimi</th>
                                <th>Määrä</th>
                                <th style={{textAlign: 'right'}}>á</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                            <tr></tr>
                            <tr>
                                <td>
                                   Yhteensä: 
                                </td>
                                <td>{totalQty}</td>
                                <td style={{textAlign: 'right'}}>{totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> : ''}
            </div>
            
        )
    }
}