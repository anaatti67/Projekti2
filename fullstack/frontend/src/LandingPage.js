import React, { Component } from 'react'
import pic1 from './img/pic1.jpg'
import pic2 from './img/pic2.jpg'
import pic3 from './img/pic3.jpg'
import Carousel from 'react-bootstrap/Carousel'
import './css/LandingPage.css'

function ControlledCarousel() {
    const [index, setIndex] = React.useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect} className="myCarousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={pic1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="carousel">Meiltä edullisia käytettyjä läppäreitä</h3>
            <p className="carousel">Kaikkien myytävien tietokoneiden kunto on varmistettu</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={pic2}
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3 className="carousel">Meiltä myös kyniä ja vihkoja edulliseen hintaan</h3>
            <p className="carousel">Kuulakärkikyniä, lyijykyniä, vihkoja ja kalentereita</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={pic3}
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3 className="carousel">Onko kysyttävää? Ota yhteyttä</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
        
    );
    
  }

class LandingPage extends Component {
    render() {
        return (
            <div>
            <h2 className="header">Tervetuloa Käytetyn tavaran verkkokauppaan opiskelijoille</h2>
            <hr/>
            <h4 className="about">Tietoa meistä</h4>
            <p className="intro">Olemme aloittaneet toimintamme vuonna 2020 kolmen henkilön voimin. Idea käytettyjen opiskelija tavaroiden verkkokaupasta lähti siitä, kun kaikki kolme kaadoimme kahvit läppäriemme päälle,
              ja tarvitsimme kiireesti uudet tilalle. Verkkoa selatessamme tajusimme, että ideaa käytetyille opiskelijatarvikkeillehan ei vielä ollut, joten me päätimme sellaisen luoda.
              Tästä saikin alkunsa verkkokauppa, jossa ajatellaan vähävaraisia opiskelijoita, joiden rahat eivät välttämättä riitä uusien tarvikkeiden ostamiseen. Samalla loimme eräänlaisen foorumin myös niille,
              jotka haluavat luopua vanhoista tarvikkeistaan ja laittaa hyvän kiertämään. Kysyntämme on ollut suurta ja olemme saaneet paljon kiitosta uniikista ideasta, joka helpottaa monen elämää.
            </p>
            <hr/>
            <ControlledCarousel />
            </div>
        )
    }
}

export default LandingPage