import React, { Component } from 'react'
import pic1 from './img/pic1.jpg'
import pic2 from './img/pic2.jpg'
import pic3 from './img/pic3.jpg'
import Carousel from 'react-bootstrap/Carousel'
import { Footer } from './Footer'

function ControlledCarousel() {
    const [index, setIndex] = React.useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={pic1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={pic2}
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={pic3}
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
        
    );
    
  }

class LandingPage extends Component {
    render() {
        return (
            <div>
            <h2>Tervetuloa Käytetyn tavaran verkkokauppaan opiskelijoille</h2>
            <hr/>
            <h4>Otsikko</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Aenean et malesuada est, vel finibus felis. 
                Fusce sit amet velit arcu. Morbi suscipit leo eu justo sagittis, 
                sed maximus ipsum suscipit. In ante ex, ornare et maximus et, 
                sollicitudin eget dui. Fusce eget tellus risus. 
                Suspendisse placerat ipsum justo, ut suscipit quam gravida in. 
                Donec nec gravida purus. Praesent interdum ultrices sapien non faucibus. 
                Sed hendrerit nibh vel gravida aliquet. Phasellus rutrum lorem mauris, 
                sed blandit nisl euismod id. Fusce cursus, justo eget ultricies porta, 
                ante ante ornare nulla, eu blandit tortor arcu eget ex. 
                Duis at pulvinar tellus. Mauris mattis fringilla lacus, ac 
                convallis lacus tincidunt imperdiet. Aliquam erat volutpat. 
                Phasellus et augue libero. Praesent molestie sapien et convallis egestas.
            </p>
            <hr/>
            <ControlledCarousel />
            <Footer/>
            </div>
        )
    }
}

export default LandingPage