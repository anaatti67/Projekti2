import React, { Component } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import './css/Modal.css'
import { NavLink } from 'react-router-dom'
import starimg from './img/star.png'
import blankstarimg from './img/starblank.png'

const Stars = (props) => {
    let starCount = props.stars
    let starSize = props.size
    const star = <img width={starSize + "px"} alt={starCount} src={starimg} />
    const blank = <img width={starSize + "px"} alt='' src={blankstarimg} />
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
            user: { username: 'default' }, canAddReview: true, admin: false }
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
            let retrievedData = JSON.parse(localStorage.getItem("user"))

            this.newReview = { 
                ProductId: this.obj.id, 
                CustomerId: retrievedData.email, 
                CustomerName: retrievedData.firstname + ' ' + retrievedData.lastname, 
                ReviewTitle: '', 
                ReviewTxt: '', 
                Rating: 5  }
            if (retrievedData.admin) {
                this.setState({ loggedIn: true, user: retrievedData, admin: true })
            } else {
                this.setState({ loggedIn: true, user: retrievedData, admin: false })
            }
            
        } 
        this.setState({ show: !this.state.show })
        if (!this.state.show) {
            fetch('https://ktvo.herokuapp.com/getReview/' + this.obj.id)
                .then(response => response.json()).then(reviews => {
                    this.setState({ reviews: reviews })
                    for (let review of reviews) {
                        if (review.CustomerId === this.state.user.email) {
                            this.setState({canAddReview: false})
                        }
                    }
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
        const configuration = {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(this.newReview)
        }
        fetch('https://ktvo.herokuapp.com/addReview/', configuration)
            .then(r => r.json()).then((response) => {
                console.log(response)
                let tmpReviews = this.state.reviews
                this.newReview.ReviewId = 0
                tmpReviews.push(this.newReview)
                this.setState({reviews: tmpReviews, canAddReview: false})
            })
    }
    deleteReview(reviewId) {
        console.log('poistetaan ' + reviewId)
        const configuration = {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({id:reviewId})
        }
        fetch('https://ktvo.herokuapp.com/deleteReview/', configuration)
            .then(r => r.json()).then((response) => {
                console.log(response)
                let tmpReviews = this.state.reviews.filter((review) =>
                    review.ReviewId !== reviewId
                )
                this.setState({reviews: tmpReviews})
            })
    }
    render() {
        let reviews = <Container><Row><Col>Ei vielä arvosteluita</Col></Row></Container>
        if (this.state.reviews.length > 0) {
            reviews = this.state.reviews.map((review) => 
            <Container key={review.ReviewId} className="reviewModalList">
                <Row>
                    <Col>
                        <span className="floatRight">
                            {this.state.admin ? <Button onClick={() => this.deleteReview(review.ReviewId)}>Poista arvio</Button> : ''}
                            <Stars stars={review.Rating} size="25px" />
                        </span>
                        <h4 className="alignLeft">{review.ReviewTitle}</h4>
                    </Col>
                    <Col className="alignLeft"><p><b>Arvostelijan id:</b> {review.CustomerId}<br/>
                        <b>Arvostelijan nimi:</b> {review.CustomerName}</p></Col>
                </Row>
                <Row>
                    <Col><p className="alignLeft">{review.ReviewTxt}</p></Col>
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
                        {this.state.canAddReview ?
                        <span>
                        <h3>Lisää arvostelu</h3>
                        <form>
                            <div className="form-group">
                                <p>Käyttäjänimi: {this.state.user.email}</p>
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
                            
                            <h5>Pisteet</h5>
                            <div className="form-check">
                                <input onChange={this.whenFormChanges} className="form-check-input" type="radio" name="rating" id="rating5" value="5" defaultChecked={true} />
                                <label className="form-check-label" htmlFor="rating5"><Stars stars="5" size="20" /></label>
                            </div>
                            <div className="form-check">
                                <input onChange={this.whenFormChanges} className="form-check-input" type="radio" name="rating" id="rating4" value="4" />
                                <label className="form-check-label" htmlFor="rating4"><Stars stars="4" size="20" /></label>
                            </div>
                            <div className="form-check">
                                <input onChange={this.whenFormChanges} className="form-check-input" type="radio" name="rating" id="rating3" value="3" />
                                <label className="form-check-label" htmlFor="rating3"><Stars stars="3" size="20" /></label>
                            </div>
                            <div className="form-check">
                                <input onChange={this.whenFormChanges} className="form-check-input" type="radio" name="rating" id="rating2" value="2" />
                                <label className="form-check-label" htmlFor="rating2"><Stars stars="2" size="20" /></label>
                            </div>
                            <div className="form-check">
                                <input onChange={this.whenFormChanges} className="form-check-input" type="radio" name="rating" id="rating1" value="1" />
                                <label className="form-check-label" htmlFor="rating1"><Stars stars="1" size="20" /></label>
                            </div>
                            <br/>
                            <button type="button" className="btn btn-success" onClick={() => this.sendReview()}>Lähetä</button>
                        </form></span> : <p>Olet jo antanut arvostelun</p>}</span>
                        : <Button onClick={() => this.setState({ showAddReview: true })} >Lisää arvostelu</Button>}
                    </Col>
                </Row>
            )
        }
        if (this.state.show === true ) {
            return(
                <span className="modalBody">
                {this.state.show ? 
                <div className="modalPosition">
                <Container className="border pad overflow">
                    <Row>
                        <Col>
                            <Button variant="danger" className="floatRight closeButton" onClick={this.toggle}>X</Button>
                            <h1>{this.obj.id} - {this.obj.Name} <Stars stars={this.obj.Rating} size="50" /></h1>
                            {addReview}
                            <hr/>
                            {reviews}
                        </Col>
                    </Row>
                </Container>
                </div>
                :
                <Button>Näytä arvostelut</Button>}
                </span>
            )
        } else {
            return <span className="fakelink" onClick={this.toggle}><Stars stars={this.obj.Rating} size="15px" />Näytä arvostelut</span>
        }
    }
}