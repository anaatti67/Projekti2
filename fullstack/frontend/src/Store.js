import React, { Component } from 'react';
import './css/Store.css'
import ProductModal from './Modal'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import ReviewModal from './ReviewModal'
import e404 from './img/productLogos/404/404.svg'

class Store extends Component {
    constructor(props) {
        super(props)
        this.handleCartQtyChanges = props.handleCartQtyChanges
        this.listOfImages = []
        this.state = {
            cart: props.cart,
            cartQty: props.cartQty,
            products: [], 
            modal: false, 
            showCategory: 'all',
            filtered: false,
            filterString: '',
            productsHaveLoaded: false
        }
        this.url = 'https://ktvo.herokuapp.com/store'
    }

    // Image directory checking starts here
    importAll(r) {
        return r.keys().map(r);
    }
    readFiles() {
        this.listOfImages = this.importAll(require.context('./img/productLogos/', false, /\.(png|jpe?g|svg)$/));
    }
    // Image directory checking ends here


    componentDidMount() {
        this.readFiles()
        let filter = this.props.location.state.filterString
        fetch(this.url).then(r => r.json()).then((products) => {
            this.setState({ products: products, filterString: filter, productsHaveLoaded: true });
            if (filter.length > 1) {
                this.setState({filtered: true, filterInputValue: filter})
            } else {
                this.setState({filterInputValue: 'Suodata...'})
            }
        })
    }
    
    static getDerivedStateFromProps(props, state) {
        if (props.cartQty !== state.cartQty) {
            return { cartQty: props.cartQty, cart: props.cart }
        }
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

    buy(product) {
        console.log(product)
        let length = this.state.cart.length
        let newItem = false;
        let tmpObj = this.state.cart

        console.log(tmpObj);
        for (let x = 0; x < length; x++) {
          if (tmpObj[x].id === product.id) {
            tmpObj[x].qty++
            tmpObj[x].price += product.price
            newItem = true;
          }
        }
        if (!newItem || tmpObj.length === 0) {
          product.qty = 1
          tmpObj.push(product)
        }

        this.handleCartQtyChanges(this.state.cartQty + 1, tmpObj)
    }
    rowClicked(product) {
        console.log(product)
        product.modal = !product.modal
    }
    setFilterCategory(category) {
        this.setState({showCategory: category})
    }
    searchFilter(filterString) {
        if (filterString.length > 1) {
            this.setState({filtered: true, filterString: filterString})

        } else {
            this.setState({filtered: false})
        }
    }
    render() {
        // Product filtering - showCategory default is 'all'
        // and it can be changed with buttons
        let filteredProducts = this.state.products
        if (this.state.showCategory !== 'all') {
            filteredProducts = filteredProducts.filter((product) => 
                product.Category === this.state.showCategory
            )
        }
        if (this.state.filtered) {
            let filter = this.state.filterString.toLowerCase()
            filteredProducts = filteredProducts.filter((product) => {
                if (product.Name.toLowerCase().includes(filter)) {
                    return product
                } else {
                    return null
                }
            })
        }

        let items = filteredProducts.map((product) =>
            <tr className="productRow" key={product.id} onClick={() => this.rowClicked(product)}>
                <td>{product.id}</td>
                <td>
                    {/* If image not found, loads a 404 image */}
                    {this.listOfImages[product.id - 1] === undefined ? <img alt='' src={e404} width="50px" />
                        : <img alt='' src={this.listOfImages[product.id - 1]} width="50px" /> }
                </td>
                <td>{product.Name}</td>
                <td>{product.Price} €</td>
                <td>{product.Stock} kpl</td>
                <td><ReviewModal obj={product} /></td>
                <td>
                    <button type="button" className="btn btn-primary" onClick={() => {
                        let tmp = {id: product.id,
                                name: product.Name, 
                                price: product.Price}
                        this.buy(tmp)}}>
                        Lisää ostoskoriin
                    </button> 
                    <ProductModal show={product.modal} obj={product} buy={this.buy.bind(this)} imgSrc={this.listOfImages[product.id - 1]} />
                </td>
            </tr>
        )
        return (
            <div className="container">
                <h1 className="mt-5">Käytettyjen tavaroiden verkkokauppa opiskelijoille</h1>                
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
                {this.state.productsHaveLoaded ? 
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Pic</th>
                        <th scope="col">Nimi</th>
                        <th scope="col">Hinta</th>
                        <th scope="col">Varastossa</th>
                        <th scope="col">Arvostelu</th>
                        <th scope="col">Toiminto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
                :
                <Loader
                    type="Grid"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    style={{textAlign: 'center'}}
                />
                }
            </div>
        )
    }
}

export default Store
