import React, { Component } from 'react';
import './css/Store.css'
import ProductModal from './Modal'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';


class Store extends Component {

    constructor(props) {
        super(props)
        console.log(props.location.state)

        //this.buy = this.buy.bind(this)
        //this.cartInit = this.cartInit(this)
        this.add = this.add.bind(this)

        this.cart = {shoppingcart: []}
        this.cartInit()

        this.state = {
            products: [], 
            modal: false, 
            showCategory: 'all',
            filtered: false,
            filterString: ''
        }
        this.url = '/store'
    }
    componentDidMount() {
        let filter = this.props.location.state.filterString
        fetch(this.url).then(r => r.json()).then((products) => {
            // console.log(products)
            this.setState({products: products, filterString: filter});
            console.log(this.state)
            if (filter.length > 1) {
                this.setState({filtered: true, filterInputValue: filter})
            } else {
                this.setState({filterInputValue: 'Suodata...'})
            }
    })
    }
    
    static getDerivedStateFromProps(props, state) {
        console.log(props.location.state.filterString)
        let newFilter = props.location.state.filterString
        if (newFilter !== state.lastRow) {
          return {
            filtered: true,
            filterInputValue: newFilter,
            filterString: newFilter
          };
        } else {
            this.setState({filterInputValue: 'Suodata...'})
        }
    
        // Return null to indicate no change to state.
        return null;
      }
    
    cartInit() {
        if ("shoppingCart" in localStorage) {
            let retrievedData = localStorage.getItem("shoppingCart");
            if (retrievedData === 'undefined') {
                localStorage.setItem("shoppingCart", JSON.stringify(this.cart.shoppingcart));
            } else {
                // console.log(retrievedData)
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
        console.log(tmpObj)
        this.setState({shoppingcart: tmpObj})
        localStorage.setItem("shoppingCart", JSON.stringify(this.state.shoppingcart));
    }
    add(id) {
        console.log(id)
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
    rowClicked(product) {
        // product.modal = !product.modal
        console.log(product)
        product.modal = !product.modal
    }
    setFilterCategory(category) {
        this.setState({showCategory: category})
    }
    searchFilter(filterString) {
        // this.setState({showCategory: 'all'})
        if (filterString.length > 1) {
            this.setState({filtered: true, filterString: filterString})

        } else {
            this.setState({filtered: false})
        }
       
    }
    render() {
        for (let product of this.state.products) {
            product.pic = '/img/' + product.id + '.png'
        }
        
        // Product filtering - showCategory default is 'all'
        // and it can be changed with buttons
        let filteredProducts = this.state.products

        if (this.state.showCategory !== 'all') {
            filteredProducts = filteredProducts.filter((product) => 
                product.Category === this.state.showCategory
            )
        }
        
        if (this.state.filtered) {
            console.log(this.state.filterString)
            let filter = this.state.filterString.toLowerCase()
            filteredProducts = filteredProducts.filter((product) => {
                if (product.Name.toLowerCase().includes(filter)) {
                    return product
                } else {
                    return null
                }
            }
                
            )
        }

        // If image not found, loads a 404 image
        let items = filteredProducts.map((product) =>
            <tr className="productRow" key={product.id} onClick={() => this.rowClicked(product)}>
                <td>{product.id}</td>
                <td><img height="35px" src={process.env.PUBLIC_URL + product.pic} alt="" 
                        onError={(e)=>{e.target.src=process.env.PUBLIC_URL + './img/404_not_found.svg'}}>
                    </img>
                </td>
                <td>{product.Name}</td>
                <td>{product.Price} €</td>
                <td>{product.Stock} kpl</td>
                <td>
                    <button type="button" className="btn btn-primary" onClick={() => {
                        let tmp = {id: product.id,
                                name: product.Name, 
                                price: product.Price}
                        this.buy(tmp)}}>
                        Lisää ostoskoriin
                    </button> <ProductModal show={product.modal} obj={product} buy={this.buy.bind(this)} />
                </td>
            </tr>
        )
        return (
            <div className="container">
                <h1 className="mt-5">Käytettyjen tavaroiden opiskelijaverkkokauppa</h1>
                <h5>Tuotteet</h5>                  
                
                    <div className="customContainer">   
                    <input placeholder={this.state.filterInputValue} onChange={(event) => this.searchFilter(event.target.value)} />             
                    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                        <ToggleButton value={1} variant="success" onClick={() => this.setFilterCategory('all')}>Kaikki</ToggleButton>
                        <ToggleButton value={2} variant="info" onClick={() => this.setFilterCategory('Kirjat')}>Kirjat</ToggleButton>
                        <ToggleButton value={3} variant="info" onClick={() => this.setFilterCategory('Tietokoneet')}>Tietokoneet</ToggleButton>
                        <ToggleButton value={4} variant="info" onClick={() => this.setFilterCategory('Toimistotarvikkeet')}>Toimistotarvikkeet</ToggleButton>
                        <ToggleButton value={5} variant="info" onClick={() => this.setFilterCategory('Äänentoisto')}>Äänentoisto</ToggleButton>
                    </ToggleButtonGroup>
                    
                    </div>
                <h5>Tuotteet</h5>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Pic</th>
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
