import React, { Component } from 'react';

class Store extends Component {
    constructor(props) {
        super(props)

        //this.buy = this.buy.bind(this)
        //this.cartInit = this.cartInit(this)
        this.add = this.add.bind(this)

        this.cart = {shoppingcart: []}
        this.cartInit()



        this.state = {products: []}
        this.url = '/store'
    }
    componentDidMount() {
        console.log(this.url);
        fetch(this.url).then(r => r.json()).then((products) => {
     
            this.setState({products});
            console.log(products);
    })
    }
    cartInit() {
        if ("shoppingCart" in localStorage) {
            let retrievedData = localStorage.getItem("shoppingCart");
            console.log(retrievedData)

            if (retrievedData === 'undefined') {
                localStorage.setItem("shoppingCart", JSON.stringify(this.cart.shoppingcart));
            } else {
                var dataToArray = JSON.parse(retrievedData);

                if (dataToArray != null) {
                    for (let x = 0; x < dataToArray.length; x++) {
                    this.cart.shoppingcart.push(dataToArray[x])
                    }
                }
            }
        }
      }
    buy(product) {
        let length = this.cart.shoppingcart.length
        console.log(this.cart)
        console.log(length)
        let newItem = 0;
        let tmpObj = this.cart.shoppingcart
        for (let x = 0; x < length; x++) {
          if (tmpObj[x].id === product.id) {
            tmpObj[x].qty++
            tmpObj[x].price += product.price
            newItem++;
          }
        }
        if (newItem === 0) {
          product.qty = 1
          tmpObj.push(product)
        }
        this.setState({shoppingcart: tmpObj})
        console.log(tmpObj)
        localStorage.setItem("shoppingCart", JSON.stringify(this.state.shoppingcart));
    }
    add(id) {
        let cart = this.state.shoppingcart
        let found = cart.find(product => product.id === id)
        found.qty += 1
        this.setState({shoppingcart: cart})
      }
    remove(id) {
        let cart = this.state.shoppingcart
        let found = cart.find(product => product.id === id)
        found.qty -= 1
        this.setState({shoppingcart: cart})
    }
    render() {
        let items = this.state.products.map((product) =>
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.Name}</td>
                <td>{product.Price}</td>
                <td>{product.Stock}</td>
                <td>
                    <button type="button" className="btn btn-primary" onClick={() => {
                        let tmp = {id: product.id,
                                name: product.Name, 
                                price: product.Price}
                        this.buy(tmp)}}>
                        Lisää ostoskoriin
                    </button>
                </td>
            </tr>)
        return (
            <div className="container">
                <h1 className="mt-5">Käytettyjen tavaroiden opiskelijaverkkokauppa</h1>
                <h5>Tavarat</h5>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nimi</th>
                        <th scope="col">Hinta</th>
                        <th scope="col">Varastossa</th>
                        <th scope="col">Toiminto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Store
