import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import './Landing.css';

class Landing extends Component {
    render(){
        return(
            <div className='Landing'>
                <Carousel interval='10000'>
                    <Carousel.Item>
                        <div className='Carouselimage-one'/>
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='Carouselimage-two'/>
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='Carouselimage-three'/>
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                    </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <ButtonGroup bsPrefix='custom-btn-group'>
                    <Link to='/boards'><Button bsPrefix='custom-btn'>Shop Boards</Button></Link>
                    <Link to='/customize'><Button bsPrefix='custom-btn'>Build Your Own</Button></Link>
                </ButtonGroup>
                <p className='Landinglinks'>Ready to get started? <Link to='/boards'>View our boards</Link> or <Link to='/customize'>build your own</Link></p>
                <div className='Landingblurb'>
                    <div className='Landingimage-one'>
                        <h4>About Us</h4>
                    </div>
                    <p>Tri-tip spare ribs frankfurter sausage pork loin biltong doner pork belly venison alcatra salami ball tip 
                    beef ribs pancetta tongue. Rump pork chop tail alcatra pork chuck pork belly ham hock beef ribs jowl bresaola 
                    chicken beef sirloin t-bone. Boudin sausage kielbasa, andouille pig strip steak tail kevin. Corned beef chicken doner 
                    strip steak ball tip jowl.</p>
                </div>
                <div className='Landingblurb'>
                    <div className='Landingimage-two'>
                        <h4>Why Our Boards?</h4>
                    </div>
                    <p>Tri-tip spare ribs frankfurter sausage pork loin biltong doner pork belly venison alcatra salami ball tip 
                    beef ribs pancetta tongue. Rump pork chop tail alcatra pork chuck pork belly ham hock beef ribs jowl bresaola 
                    chicken beef sirloin t-bone. Boudin sausage kielbasa, andouille pig strip steak tail kevin. Corned beef chicken doner 
                    strip steak ball tip jowl.</p>
                </div>                
                <div className='Landingblurb'>
                    <div className='Landingimage-three'>
                        <h4>Get Started</h4>
                    </div>
                    <p>Tri-tip spare ribs frankfurter sausage pork loin biltong doner pork belly venison alcatra salami ball tip 
                    beef ribs pancetta tongue. Rump pork chop tail alcatra pork chuck pork belly ham hock beef ribs jowl bresaola 
                    chicken beef sirloin t-bone. Boudin sausage kielbasa, andouille pig strip steak tail kevin. Corned beef chicken doner 
                    strip steak ball tip jowl.</p>
                </div>
            </div>
        )
    }
}

export default Landing;