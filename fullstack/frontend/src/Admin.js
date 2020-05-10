import React, { Component } from 'react';
import ModifyProductModal from './ModifyModal';
import Loader from 'react-loader-spinner'


class Admin extends Component {
    constructor(props) {
        super(props)
        this.add = this.add.bind(this)
        this.whenFormChanges = this.whenFormChanges.bind(this)
        this.state = { showProductAdd: false, showProductModify: false, products: [], addInfo: '', productsHaveLoaded: false }
        this.item = { name: '', description: '', price: '', stock: '', category: ''}
        
    }
    componentDidMount() {
        fetch('https://ktvo.herokuapp.com/store').then(r => r.json()).then((products) => {
            console.log(products)
            this.setState({ products: products, productsHaveLoaded: true });
        })
    }
    add() {
        console.log(this.item)
        const url = 'https://ktvo.herokuapp.com/add'
        //let item = {name: 'iMac Pro', price: 4000, stock: 1}
        const configuration = {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(this.item)
        }
         
        fetch(url, configuration).then(r => r.json()).then((response) => {
            console.log(response);

            let tmpItems = this.state.products
            let tmpObj = { Category: this.item.category, 
                Description: this.item.description,
                Name: this.item.name,
                Price: this.item.price,
                Stock: this.item.stock,
                id: response.insertId }
            tmpItems.push(tmpObj)
            this.setState({products: tmpItems, 
                addInfo: 'Added a new product with id: ' + response.insertId})
        }) 
    }

    whenFormChanges(event) {
      /*   console.log(event.target.name)
        console.log(event.target.value) */
        if (event.target.name === 'name') {
            this.item.name = event.target.value
        } else if (event.target.name === 'price') {
            this.item.price = event.target.value
        } else if (event.target.name === 'stock') {
            this.item.stock = event.target.value
        } else if (event.target.name === 'category') {
            this.item.category = event.target.options[event.target.selectedIndex].value
        } else if (event.target.name === 'description') {
            this.item.description = event.target.value
            console.log(this.item.category)
        }
    }
    rowClicked(product) {
        console.log(product)
    } 
    deleteProduct(product) {
        console.log('delete: ' + product.Name)

        const configuration = {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(product)
        }

        const url = 'https://ktvo.herokuapp.com/delete'
        fetch(url, configuration).then(r => r.json()).then((response) => {
            console.log(response);
            let tmpItems = this.state.products
            tmpItems = tmpItems.filter(item => 
                item.id !== response.insertId
            )
            console.log(tmpItems)
            this.setState({ products: tmpItems })
        }) 
    }
    modify(product) {
        console.log('Modify')
        console.log(product)

        const url = 'https://ktvo.herokuapp.com/update'
        //let item = {name: 'iMac Pro', price: 4000, stock: 1}
        const configuration = {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(product)
        }

        fetch(url, configuration).then(r => r.json()).then((response) => {
            console.log(response);
            console.log(response.message)

            let tmpItems = this.state.products
            for (let prod of tmpItems) {
                if (prod.id === product.id) {
                    prod.Name = product.name
                    prod.Category = product.category
                    prod.Description = product.description
                    prod.Price = product.price
                    prod.Stock = product.stock
                    this.setState({ products: tmpItems })
                }
            }

        }) 
    }
    render() {
        let items = this.state.products.map((product) =>
            <tr className="productRow" key={product.id} onClick={() => this.rowClicked(product)}>
                <td>{product.id}</td>
                <td>{product.Name}</td>
                <td>{product.Price}</td>
                <td>{product.Stock}</td>
                <td><span style={{display: 'inline-block', height: '2em', overflow: 'hidden'}}>{product.Description}</span></td>
                <td>{product.Category}</td>
                <td><ModifyProductModal show={product.modal} obj={product} modify={this.modify.bind(this)} /></td>
                <td><button type="button" className="btn btn-danger" 
                        onClick={() => { 
                            if(window.confirm('Really delete ' + product.Name + '?')) this.deleteProduct(product) }}>
                        Poista</button></td>
            </tr>
        )
        return (
            <div className="container adminbody">
                <h1 className="mt-5">Admin</h1>
                { this.state.showProductAdd ? 
                <div>
                <button type="button" className="btn btn-secondary" onClick={() => this.setState({showProductAdd: false})}>Piilota</button>
                <form id="addForm">
                    <div className="form-group">
                        <label htmlFor="name">Tuotteen nimi</label>
                        <input type="text" onChange={this.whenFormChanges} name="name" 
                            className="form-control" id="name" placeholder="iMac Pro"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Selite</label>
                        <input type="text" onChange={this.whenFormChanges} 
                            name="description" className="form-control" id="description" placeholder=""/>
                    </div>
                    <div className="form-group">
                    <label id="categoryTitle" htmlFor="category">Kategoria</label>
                    <select id="categoryList" onChange={this.whenFormChanges} name="category">
                    <option value = "">Valitse kategoria</option>
                        <option value = "Kirjat">Kirjat</option>
                        <option value = "Tietokoneet">Tietokoneet</option>
                        <option value = "Toimistotarvikkeet">Toimistotarvikkeet</option>
                        <option value = "Äänentoisto">Äänentoisto</option>
                    </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Tuotteen hinta</label>
                        <input type="number" onChange={this.whenFormChanges} name="price" className="form-control" id="price" placeholder="4000"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Varastosaldo</label>
                        <input type="number" onChange={this.whenFormChanges} name="stock" className="form-control" id="stock" placeholder="0"/>
                    </div>
                    <button type="button" className="btn btn-success" onClick={this.add}>Lisää</button>
                    <button type="button" className="btn btn-warning" style={{marginLeft: '1em'}}
                        onClick={() => document.getElementById("addForm").reset()}>Tyhjennä</button>
                    <p>{this.state.addInfo}</p>
                </form></div>
                : <div><button type="button" className="btn btn-primary" onClick={() => this.setState({showProductAdd: true})}>Lisää tuotteita</button></div>}

                <hr/>
                {this.state.showProductModify ?
                <div>
                    <button type="button" className="btn btn-secondary" onClick={() => this.setState({showProductModify: false})}>Piilota</button>
                    {this.state.productsHaveLoaded ? 
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nimi</th>
                                <th>Hinta</th>
                                <th>Varasto</th>
                                <th>Selite</th>
                                <th>Kategoria</th>
                                <th>Muokkaa</th>
                                <th>Tuhoa</th>
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
                    />}
                </div> 
                : <div><button id="" type="button" className="btn btn-primary" onClick={() => this.setState({showProductModify: true})}>Muokkaa tuotteita</button></div>}
            </div>
        )
    }
}
export default Admin