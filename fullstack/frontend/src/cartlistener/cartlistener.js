import React, { Component } from 'react'
import cartImg from '../img/cart.png'
import './cartlistener.css'
import { NavLink } from 'react-router-dom'

export class CartListener extends Component {
    constructor(props) {
        super(props)
        this.handleCartQtyChanges = props.handleCartQtyChanges
        this.clearCart = props.clearCart
        this.toggle = this.toggle.bind(this)
        this.state = {show: props.show, shoppingCart: props.cart, cartQty: props.cartQty, products: [] }
    }
    static getDerivedStateFromProps(props,state) {
        if (props.cartQty !== state.cartQty) {
            return { shoppingCart: props.cart, cartQty: props.cartQty }
        }
        return null
    }
    componentDidMount() {
        fetch('https://ktvo.herokuapp.com/store').then(r => r.json()).then((products) => {
          this.setState({ products: products })})
    }
    toggle() {
        this.setState({show: !this.state.show})
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
    checkStock(id, cartQty) {
        console.log(id + ', ' + cartQty)
        for (let item of this.state.products) {
            if(item.id === id && item.Stock <= cartQty) {
                return false
            }
        }
        return true
    }
    render() {
        let items = this.state.shoppingCart.map((product) => 
            <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.qty}</td>
                <td className="txtAlignRight">{product.price}</td>
                <td>
                    {this.checkStock(product.id, product.qty) ?
                    <button type="button" className="btn btn-secondary valueAdjust" onClick={() => this.changeValue(product, 1)}>+</button>
                    : ''}
                </td>
                <td>
                    <button type="button" className="btn btn-secondary valueAdjust" onClick={() => this.changeValue(product, -1)}>-</button>
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
            <div className="cartlistenerBody">
                <img alt="Shopping Cart" src={cartImg} className="cartImgStyle" onClick={() => this.toggle()} />
                <div className="cartQty">{totalQty}</div>
                {this.state.show ? 
                <div className="cartStyle">
                    <button type="button" className="btn btn-danger floatRight" onClick={() => this.toggle()}>X</button>
                    <h5>Ostoskori</h5>
                    <table className="tableStyle">
                        <thead>
                            <tr>
                                <th>Nimi</th>
                                <th>Määrä</th>
                                <th className="txtAlignRight">á</th>
                                <th colSpan="2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items}
                            <tr><td colSpan="5"><hr/></td></tr>
                            <tr>
                                <td>
                                   Yhteensä: 
                                </td>
                                <td>{totalQty}</td>
                                <td className="txtAlignRight">{totalPrice}</td>
                            </tr>
                            <tr><td colSpan="5"><hr/></td></tr>
                            <tr>
                                <td colSpan="5">
                                    <button id="emptyCartButton" type="button" className="btn btn-danger" onClick={() => {
                                            if(window.confirm('Really clear the shopping cart?')) {                       
                                                this.clearCart()
                                            }
                                        }}>                        
                                        Tyhjennä ostoskori
                                    </button>
                                    <NavLink to="/cart"><button type="button" className="btn btn-success floatRight">Tilaamaan</button></NavLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> : ''}
            </div>
            
        )
    }
}
