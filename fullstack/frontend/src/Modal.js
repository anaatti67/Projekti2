import React, { Component } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import './css/Modal.css'
import e404 from './img/productLogos/404/404.svg'

export default class ProductModal extends Component {
    constructor(props) {
        super(props)
        this.state = {show: props.show}
        this.imgSrc = props.imgSrc
        this.toggle = this.toggle.bind(this)
        this.obj = props.obj
        this.addToCart = props.buy
        this.checkStock = props.checkStock
    }
    toggle() {
        let toggle = this.state.show
        this.setState({show: !toggle})
    }
    render() {
        if (this.state.show === true ) {
            return(
                <div>
                <Button variant="info" onClick={this.toggle}>Tuotetiedot</Button>
                <div className="modalPosition">
                <Container className="border pad">
                    <Row>
                        <Col>
                            
                            <Button className="btn btn-danger floatRight" onClick={this.toggle}>Sulje</Button>
                            <h1>{this.obj.Name}</h1>
                            <p>Kategoria: {this.obj.Category}</p>
                        </Col>
                    </Row>
                    <Row className="border">
                        <Col>
                        {this.imgSrc === undefined ? <img alt='' src={e404} width="50px" className="modalImg" />
                        : <img alt='' src={this.imgSrc} className="modalImg" /> }
                        </Col>
                        <Col>
                        <h4>Tuoteselostus</h4>
                        <p>{this.obj.Description}</p>
                        </Col>
                        
                        
                    </Row>
                    <Row className="border">
                        <Col><h5>Jäljellä varastossa: {this.obj.Stock}</h5></Col>
                        <Col>
                            <p className="price">{this.obj.Price} €</p>
                            {this.checkStock(this.obj.id, this.obj.Stock) ? 
                            <Button variant="info" onClick={() => {
                                let tmp = {id: this.obj.id,
                                    name: this.obj.Name, 
                                    price: this.obj.Price}
                                this.addToCart(tmp)
                                }}>Lisää ostoskoriin</Button>
                            :
                            <p>Et voi tilata enempää kuin varastossa on tuotetta</p>}
                        </Col>
                    </Row>
                </Container>
                </div>
                </div>
                
            
        )
        } else {
            return <Button variant="info" onClick={this.toggle}>Tuotetiedot</Button>
        }
        
        
    }
}