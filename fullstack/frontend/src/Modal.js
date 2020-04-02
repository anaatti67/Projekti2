import React, { Component } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import './css/Modal.css'

export default class ProductModal extends Component {
    constructor(props) {
        super(props)
        this.state = {show: props.show}
        this.toggle = this.toggle.bind(this)
        this.obj = this.props.obj
        this.addToCart = this.props.buy
    }
    toggle() {
        let toggle = this.state.show
        this.setState({show: !toggle})
    }
    render() {
        if (this.state.show === true ) {
            return(
                <span>
<Button onClick={this.toggle}>Tuotetiedot</Button>
                    <div style={{
                background: "rgba(255, 255, 255, 0.9)", 
                zIndex: "10",
                display: "inline-block",
                position: "fixed",
                top: "0",
                left: "0",
                bottom: "0",
                right: "0",
                width: "70%",
                height: "70%",
                margin: "auto",
                borderRadius: "25px"
                }}>
                <Container className="border pad">
                    <Row>
                        <Col>
                            
                            <Button className="btn btn-danger" style={{float: "right"}}onClick={this.toggle}>Sulje</Button>
                            <h1 style={{paddingBottom: "10%"}}>{this.obj.Name}</h1>
                            <p>Kategoria: {this.obj.Category}</p>
                        </Col>
                    </Row>
                    <Row className="border">
                        <Col><img className="modalImg" src={process.env.PUBLIC_URL + this.obj.pic} alt="" 
                            onError={(e)=>{e.target.src=process.env.PUBLIC_URL + './img/404_not_found.svg'}}>
                        </img></Col>
                        <Col>
                        <h4>Tuoteselostus</h4>
                        <p>{this.obj.Description}</p>
                        </Col>
                        
                        
                    </Row>
                    <Row className="border">
                        <Col><h5>Jäljellä varastossa: {this.obj.Stock}</h5></Col>
                        <Col>
                            <p className="price">{this.obj.Price} €</p>
                            <Button variant="info" onClick={() => this.addToCart(this.obj)}>Lisää ostoskoriin</Button>
                        </Col>
                    </Row>
                </Container>
                    
                                        
                        
                    
                        
                    
                    
                </div>
                </span>
                
            
        )
        } else {
            return <Button  variant="info" onClick={this.toggle}>Tuotetiedot</Button>
        }
        
        
    }
}