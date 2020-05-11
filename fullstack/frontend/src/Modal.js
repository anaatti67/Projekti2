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
                <div className="modalBody">
                {this.state.show ?
                <div className="modalPosition">
                <Container>
                    <Row>
                        <Col>
                            
                            <Button variant="danger" className="floatRight closeButton" onClick={this.toggle}>X</Button>
                            <h1>{this.obj.Name}</h1>
                            <p>Kategoria: {this.obj.Category}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} xs={12}>
                        {this.imgSrc === undefined ? <img alt='' src={e404} width="50px" className="modalImg" />
                        : <img alt='' src={this.imgSrc} className="modalImg" /> }
                        </Col>
                        <Col lg={6} xs={12}>
                        <h4>Tuoteselostus</h4>
                        <p className="descriptionTxt">{this.obj.Description}</p>
                        <p className="price">{this.obj.Price} €</p>
                        </Col>
                        
                        
                    </Row>
                    <Row>
                        <Col><h5>Jäljellä varastossa: {this.obj.Stock}</h5></Col>
                        <Col>
                            {this.checkStock(this.obj.id, this.obj.Stock) ? 
                            <Button variant="success" className="addButton"  onClick={() => {
                                let tmp = {id: this.obj.id,
                                    name: this.obj.Name, 
                                    price: this.obj.Price}
                                this.addToCart(tmp)
                                }}>Lisää ostoskoriin</Button>
                            :
                            <p>Tuote on loppunut varastosta.</p>}
                        </Col>
                    </Row>
                </Container>
                </div>
                : <Button variant="info" onClick={this.toggle}>Tuotetiedot</Button>}
                </div>
                
            
        )
        } else {
            return <Button variant="info" size="sm" onClick={this.toggle}>Tuotetiedot</Button>
        }
        
        
    }
}