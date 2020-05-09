import React, { Component } from 'react';
import './css/Footer.css'

export class Footer extends Component {

    constructor(props) {
        super(props)
        this.state = {  }

        
    }

     

    componentDidMount() {
       
    }

    
    checkURL() {
      
    }


    render() {
        return (
            <div className="footer">
                <div className="footerInfoContainer address">
                <h5>Osoite</h5>
                <p>keksittykuja 3</p>
                <p>Tampere</p>
                <p>33320</p>
                </div>
                <div className="footerInfoContainer happenings">
                    <h5>Tapahtumia</h5>
                    <p>Tampereella tapahtuu</p>
                    <p>Opiskelijaseminaarit</p>
                    <p>Kulttuuria opiskelijoille</p>
                </div>
                <div className="footerInfoContainer moreInfo">
                    <h5>Linkit</h5>
                    <p>Verkkokursseja opiskelijoille</p>
                    <p>Lisää tietoa meistä</p>
                    <p>Asiakaspalvelu</p>
                </div>
                
            </div>
        )

    }

}