import React, {Component} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Landing.css';

class Landing extends Component {
    render(){
        return(
            <div className='Landing'>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://tbcdn.talentbrew.com/company/3401/v1_0/img/workinghere/engagement/360-placeholder.jpg"
                            alt="First slide"
                        />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://tbcdn.talentbrew.com/company/3401/v1_0/img/workinghere/engagement/360-placeholder.jpg"
                            alt="Third slide"
                        />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://tbcdn.talentbrew.com/company/3401/v1_0/img/workinghere/engagement/360-placeholder.jpg"
                            alt="Third slide"
                        />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}

export default Landing;