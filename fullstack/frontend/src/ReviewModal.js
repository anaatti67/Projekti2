import React, { Component } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import './css/Modal.css'
import { NavLink } from 'react-router-dom'
import starimg from './img/star.png'
import blankstarimg from './img/starblank.png'

const Stars = (props) => {
    let starCount = props.stars
    const star = <img width="25px" alt={starCount} src={starimg} />
    const blank = <img width="25px" alt='' src={blankstarimg} />
    let stars = []
    for (let x = 0; x < 5; x++) {
        if (starCount > 0) {
            stars.push(<span key={x}>{star}</span>)
            starCount--
        } else {
            stars.push(<span key={x}>{blank}</span>)
        }
    }
    return (
        <div>{stars}</div>
    )
}

export default class ReviewModal extends Component {
    constructor(props) {
        super(props)
        this.state = { show: false, reviews: [], loggedIn: false, 
            user: { username: 'default' }, canAddReview: false }
        this.toggle = this.toggle.bind(this)
        this.whenFormChanges = this.whenFormChanges.bind(this)
        this.obj = props.obj
        this.newReview = { 
            ProductId: this.obj.id, 
            CustomerId: '', 
            CustomerName: '', 
            ReviewTitle: '', 
            ReviewTxt: '', 
            Rating: 5  }
    }
    toggle() {
        if ("user" in localStorage) {
            console.log('user found in localstorage')

            let retrievedData = JSON.parse(localStorage.getItem("user"))
            console.log(retrievedData)

            this.newReview = { 
                ProductId: this.obj.id, 
                CustomerId: 'BO0XSMyXvVb9cPwWBGeHyI4Zk7o2', 
                CustomerName: retrievedData.username, 
                ReviewTitle: '', 
                ReviewTxt: '', 
                Rating: 5  }

            this.setState({ loggedIn: true, user: retrievedData })
        } 
        this.setState({ show: !this.state.show })
        if (!this.state.show) {
            fetch('https://ktvo.herokuapp.com/getReview/' + this.obj.id)
                .then(response => response.json()).then(reviews => {
                    this.setState({ reviews: reviews })
                })
        }
    }
    componentDidMount() {
        fetch('https://ktvo.herokuapp.com/getAverage/' + this.obj.id)
            .then(response => response.json()).then(avg => {
                this.obj.Rating = avg[0].Average
            })
    }
    whenFormChanges(event) {
        if (event.target.name === 'reviewTitle') {
            this.newReview.ReviewTitle = event.target.value
        } else if (event.target.name === 'reviewTxt') {
            this.newReview.ReviewTxt = event.target.value
        } else if (event.target.name === 'rating') {
            this.newReview.Rating = parseInt(event.target.value)
        }
        console.log(this.newReview)
    }
    sendReview() {
        console.log(this.newReview)
        const configuration = {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(this.newReview)
        }
        fetch('https://ktvo.herokuapp.com/addReview/', configuration)
            .then(r => r.json()).then((response) => {
                console.log(response)
                let tmpReviews = this.state.reviews
                tmpReviews.push(this.newReview)
                this.setState({reviews: tmpReviews})
            })
    }
    render() {
        let reviews = <Container><Row><Col>Ei vielä arvosteluita</Col></Row></Container>
        if (this.state.reviews.length > 0) {
            reviews = this.state.reviews.map((review) => 
            <Container key={review.ReviewId} style={{background: 'darkslategrey', color: 'white', margin: '3em 0em', padding: '1em', borderRadius: '25px'}}>
                <Row>
                    <Col>
                        <span style={{float: 'right'}}><Stars stars={review.Rating} /></span><h4>{review.ReviewTitle}</h4>
                    </Col>
                    <Col><p>Arvostelijan id: {review.CustomerId}<br/>
                        Arvostelijan nimi: {review.CustomerName}</p></Col>
                </Row>
                <Row>
                    <Col><p>{review.ReviewTxt}</p></Col>
                </Row>
            </Container>
        )}
        let addReview = <Row><Col><NavLink to="/login" >Kirjaudu sisään</NavLink> lisätäksesi arvostelun.</Col></Row>
        if (this.state.loggedIn) {
            addReview = (
                <Row>
                    <Col>
                        {this.state.showAddReview ?
                        <span>
                        <Button onClick={() => this.setState({ showAddReview: false })} >Piilota</Button>
                        <h3>Lisää arvostelu</h3>
                        <form>
                            <div className="form-group">
                                <p>Käyttäjänimi: {this.state.user.username}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="reviewTitle">Arvostelun otsikko</label>
                                <input type="text" onChange={this.whenFormChanges} 
                                    defaultValue={this.newReview.title} name="reviewTitle" 
                                    className="form-control" id="reviewTitle" placeholder="Otsikko"/>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="reviewTxt">Arvostelu (max. 1000 merkkiä)</label>
                                <textarea type="text" rows="6" onChange={this.whenFormChanges} 
                                    defaultValue={this.newReview.txt} name="reviewTxt" 
                                    className="form-control" id="reviewTxt" placeholder="Kirjoita arvostelu tähän..."/>
                            </div>
            
                            <div className="form-check form-check-inline">
                                <input onChange={this.whenFormChanges} className="form-check-input" type="radio" name="rating" id="rating5" value="5" defaultChecked={true} />
                                <label className="form-check-label" htmlFor="rating5">5</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onChange={this.whenFormChanges} className="form-check-input" type="radio" name="rating" id="rating4" value="4" />
                                <label className="form-check-label" htmlFor="rating4">4</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onChange={this.whenFormChanges} className="form-check-input" type="radio" name="rating" id="rating3" value="3" />
                                <label className="form-check-label" htmlFor="rating3">3</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onChange={this.whenFormChanges} className="form-check-input" type="radio" name="rating" id="rating2" value="2" />
                                <label className="form-check-label" htmlFor="rating2">2</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onChange={this.whenFormChanges} className="form-check-input" type="radio" name="rating" id="rating1" value="1" />
                                <label className="form-check-label" htmlFor="rating1">1</label>
                            </div>
                            <br/>
                            <button type="button" className="btn btn-success" onClick={() => this.sendReview()}>Lähetä</button>
                        </form></span>
                        : <Button onClick={() => this.setState({ showAddReview: true })} >Lisää arvostelu</Button>}
                    </Col>
                </Row>
            )
        }
        const style = {
            background: "rgba(255, 255, 255, 0.9)", 
            zIndex: "10",
            display: "inline-block",
            position: "fixed",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            width: "70%",
            height: "100%",
            margin: "auto",
            borderRadius: "25px"
            }
        if (this.state.show === true ) {
            return(
                <span>
                <Button>Näytä arvostelut</Button>
                <div style={style}>
                <Container className="border pad overflow">
                    <Row>
                        <Col>
                            <Button className="btn btn-danger" style={{float: "right"}} onClick={this.toggle}>X</Button>
                            <h1>{this.obj.id} - {this.obj.Name} <Stars stars={this.obj.Rating} /></h1>
                            {addReview}
                            <hr/>
                            {reviews}
                        </Col>
                    </Row>
                </Container>
                </div>
                </span>
            )
        } else {
            return <span><Stars stars={this.obj.Rating} /><br/><p className="fakelink" onClick={this.toggle}>Näytä arvostelut</p></span>
        }
    }
}