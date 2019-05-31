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
                        {/* <h6 className='carousel-prompts'>O.D.N.T Longboards</h6> */}
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='Carouselimage-two'/>
                    <Carousel.Caption>
                        {/* <h6 className='carousel-prompts'>Handmade boards that fit your style</h6> */}
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='Carouselimage-three'/>
                    <Carousel.Caption>
                        {/* <h6 className='carousel-prompts'>Customize a board today</h6> */}
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
                    <div className='large-screen-blurb'>
                        <h4 className='large-screen-prompt'>About Us</h4>
                        <p className='Landing-text'>Old Dog New Trick Longboards prides itself in building handmade, quality longboards that 
                        anybody can ride. O.D.N.T. Longboards started in Arizona, building longboards of all makes, and continues to do so to 
                        this day.</p>
                    </div>
                </div>
                <div className='Landingblurb-two'>
                    <div className='Landingimage-two'>
                        <h4>Why Our Boards?</h4>
                    </div>
                    <div className='large-screen-blurb'>
                        <h4 className='large-screen-prompt'>Why Our Boards</h4>
                        <p className='Landing-text'>The reason to choose our boards is simple: they are handmade. Handmade longboards provide 
                        a quality and feel that machine made boards don't offer. Our customers love the quality they get from our boards, which 
                        is why they will always be handmade, made to fit you and your lifestyle.</p>
                    </div>
                </div>                
                <div className='Landingblurb'>
                    <div className='Landingimage-three'>
                        <h4>Get Started</h4>
                    </div>
                    <div className='large-screen-blurb'>
                        <h4 className='large-screen-prompt'>Get Started</h4>
                        <p className='Landing-text'>Now that you've read about us, let's get started!</p>
                        <div className='get-started-button-container'>
                        <Link to='/boards'><Button bsPrefix='get-started-btn'>Shop our Boards</Button></Link>
                        <Link to='/customize'><Button bsPrefix='get-started-btn'>Build your own</Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;