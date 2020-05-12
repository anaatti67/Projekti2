import React, { Component } from 'react';
import './css/Store.css'
import ProductModal from './Modal'
import { Col, Container, Row, Button } from 'react-bootstrap';
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
            productsHaveLoaded: false,
            oldFilter: ''
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
        })
       
    }
    
    static getDerivedStateFromProps(props, state) {
        if (props.cartQty !== state.cartQty) {
            return { cartQty: props.cartQty, cart: props.cart }
        }
        let newFilter = props.location.state.filterString
        if (newFilter !== state.oldFilter) {
            if (newFilter !== state.filterString) {
                return {
                    oldFilter: newFilter,
                    filtered: true,
                    filterString: newFilter
                };
            }
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
        product.modal = !product.modal
    }
    setFilterCategory(category) {
        this.setState({showCategory: category, filterString: ''})
    }
    searchFilter(newFilterString) {
        this.setState({filtered: true, filterString: newFilterString})
        if (newFilterString.length > 1) {
            this.setState({filtered: true, filterString: newFilterString})
        } else {
            this.setState({filtered: false})
        }
    }
    getStock(stockAmount) {
        let color
        if (stockAmount <= 0) {
            color = 'red'
        } else if (stockAmount < 10) {
            color = 'orange'
        } else if (stockAmount >= 10) {
            color = 'green'
        }
        let emptyDiv = {
            borderRadius: '25px',
            background: color,
            padding: '0',
            margin: '0',
            marginTop: '2px',
            minWidth: '25px',
            maxWidth: '25px',
            height: '25px',
            marginLeft: '25%'
        }
        return (<div style={{display: 'inline-block'}}>
                        <div style={emptyDiv} ></div>
                        <div className="stockAmount">Varastossa<br/> {stockAmount} kpl</div>
                </div>)
    }
    checkStock(id, stockQty) {
        if (stockQty <= 0) {
            return false
        }
        for (let item of this.state.cart) {
            if(item.id === id) {
                if (item.qty >= stockQty) {
                    return false
                }
            }
        }
        return true
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
        let items
        if (filteredProducts[0] !== undefined) {
            items = filteredProducts.map((product) =>
            <Col md={3} xs={6} key={product.id}> 
            <Container className="productBox">
                <Row>
                    <Col>{/* If image not found, loads a 404 image */}
                        {this.listOfImages[product.id - 1] === undefined ? <img alt='' src={e404} className="productBoxImg" />
                            : <img alt='' src={this.listOfImages[product.id - 1]} className="productBoxImg" /> }
                    </Col>
                </Row>
                <Row><Col className="productBoxName">{product.Name}</Col></Row>
                <Row><Col className="productBoxPrice">{product.Price} €</Col></Row>
                <Row>
                    <Col><ProductModal show={product.modal} obj={product} 
                            buy={this.buy.bind(this)} imgSrc={this.listOfImages[product.id - 1]} 
                            checkStock={this.checkStock.bind(this)} /></Col>
                    
                </Row>
                
                <Row>
                    <Col md={6}>{this.getStock(product.Stock)}</Col>
                    <Col md={6}><ReviewModal obj={product} /></Col>
                </Row>
                <Row>
                    <Col>{this.checkStock(product.id, product.Stock) ? 
                        <Button size="sm" variant="success" onClick={() => {
                            let tmp = {id: product.id,
                                    name: product.Name, 
                                    price: product.Price}
                            this.buy(tmp)}}>
                            Lisää ostoskoriin
                        </Button> 
                        : <p className="outOfBounds">Tuote on loppunut varastosta.</p>}</Col>
                </Row>
            </Container>
            </Col>
        )} else {
            items = <Col><p>Ei löytynyt suodatusta vastaavia tuotteita.</p></Col>
        }
        return (
            <div className="container testBorder">
                <h1 className="mt-5">Kauppa</h1>                
                <div className="customContainer">   
                    <input className="suodata" placeholder="Suodata..." onChange={(event) => this.searchFilter(event.target.value)} /><br/>           
                    <Button size="sm" ariant="success" onClick={() => this.setFilterCategory('all')}>Kaikki</Button>{' '}
                    <Button size="sm" variant="info" onClick={() => this.setFilterCategory('Kirjat')}>Kirjat</Button>{' '}
                    <Button size="sm" variant="info" onClick={() => this.setFilterCategory('Tietokoneet')}>Tietokoneet</Button>{' '}
                    <Button size="sm" variant="info" onClick={() => this.setFilterCategory('Toimistotarvikkeet')}>Toimisto</Button>{' '}
                    <Button size="sm" variant="info" onClick={() => this.setFilterCategory('Äänentoisto')}>Ääni</Button>
                </div>
                <h5>Tuotteet</h5>
                {this.state.productsHaveLoaded ? 
                <Container>
                    <Row>
                        {items}
                    </Row>
                </Container>
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
