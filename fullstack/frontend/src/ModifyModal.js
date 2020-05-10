import React, { Component } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import './css/Modal.css'

export default class ModifyProductModal extends Component {
    constructor(props) {
        super(props)
        this.modify = props.modify
        this.state = {show: props.show}
        this.toggle = this.toggle.bind(this)
        this.whenFormChanges = this.whenFormChanges.bind(this)
        this.obj = props.obj
        this.modifiedItem = { id: this.obj.id, 
            name: this.obj.Name,
            description: this.obj.Description, 
            price: this.obj.Price, 
            stock: this.obj.Stock, 
            category: this.obj.Category}
    }
    toggle() {
        let toggle = this.state.show
        this.setState({show: !toggle})
    }
    whenFormChanges(event) {
        if (event.target.name === 'name') {
            this.modifiedItem.name = event.target.value
        } else if (event.target.name === 'price') {
            this.modifiedItem.price = event.target.value
        } else if (event.target.name === 'stock') {
            this.modifiedItem.stock = event.target.value
        } else if (event.target.name === 'category') {
            this.modifiedItem.category = event.target.options[event.target.selectedIndex].value
        } else if (event.target.name === 'description') {
            this.modifiedItem.description = event.target.value
        }
    }
    render() {
        if (this.state.show === true ) {
            return(
                <span>
                <Button onClick={this.toggle}>Muokkaa</Button>
                <div className="modalPosition">
                <Container className="border pad">
                    <Row>
                        <Col>
                            <Button className="btn btn-danger floatRight" onClick={this.toggle}>Sulje</Button>
                            <h1>Muokkaa tuotetta</h1>
                            <p>Id: {this.modifiedItem.id}</p>
                        </Col>
                    </Row>
                    <Row className="border">
                        <Col>
                        <form id="modifyForm">
                            <div className="form-group">
                                <label htmlFor="name">Tuotteen nimi</label>
                                <input type="text" onChange={this.whenFormChanges} 
                                    defaultValue={this.modifiedItem.name} name="name" 
                                    className="form-control" id="name" placeholder="iMac Pro"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Selite</label>
                                <textarea onChange={this.whenFormChanges} rows="6"
                                defaultValue={this.modifiedItem.description}
                                name="description" className="form-control" id="description" placeholder=""/>
                            </div>
                            <div className="form-group">
                            <label id="categoryTitle" htmlFor="category">Kategoria</label>
                            <select id="categoryList" onChange={this.whenFormChanges} name="category" defaultValue={this.modifiedItem.category}>
                                <option value = "Kirjat">Kirjat</option>
                                <option value = "Tietokoneet">Tietokoneet</option>
                                <option value = "Toimistotarvikkeet">Toimistotarvikkeet</option>
                                <option value = "Äänentoisto">Äänentoisto</option>
                            </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Tuotteen hinta</label>
                                <input type="number" onChange={this.whenFormChanges} 
                                defaultValue={this.modifiedItem.price} name="price" 
                                className="form-control" id="price" placeholder="4000"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock">Varastosaldo</label>
                                <input type="number" onChange={this.whenFormChanges} 
                                defaultValue={this.modifiedItem.stock} name="stock" 
                                className="form-control" id="stock" placeholder="0"/>
                            </div>
                            <button type="button" className="btn btn-primary" 
                                onClick={() => {
                                    this.modify(this.modifiedItem)
                                    this.toggle()
                                    }}>Muokkaa</button>
                        </form>
                        </Col>
                    </Row>
                </Container>
                </div>
                </span>
            )
        } else {
            return <Button  variant="info" onClick={this.toggle}>Muokkaa</Button>
        }
    }
}