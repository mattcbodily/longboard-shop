import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className='About'>
            <div className='Landingblurb'>
                <div className='Landingimage-one'>
                    <h4>How we Started</h4>
                </div>
                <div className='large-screen-blurb'>
                    <h4 className='large-screen-prompt'>How we Started</h4>
                    <p className='Landing-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam hendrerit, leo at eleifend 
                    volutpat, ipsum lorem mollis sapien, a rutrum arcu sapien eget nisl. Nunc diam nunc, ullamcorper eget orci non, porta 
                    laoreet odio. In nec sem luctus, dignissim ex a, vulputate sapien. Morbi congue leo eu diam rutrum, eu viverra mi 
                    vehicula.</p>
                </div>    
            </div>
            <div className='Landingblurb-two'>
                <div className='Landingimage-two'>
                    <h4>About Aaron</h4>
                </div>
                <div className='large-screen-blurb'>
                    <h4 className='large-screen-prompt'>About Aaron</h4>
                    <p className='Landing-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam hendrerit, leo at eleifend 
                    volutpat, ipsum lorem mollis sapien, a rutrum arcu sapien eget nisl. Nunc diam nunc, ullamcorper eget orci non, porta 
                    laoreet odio. In nec sem luctus, dignissim ex a, vulputate sapien. Morbi congue leo eu diam rutrum, eu viverra mi 
                    vehicula.</p>
                </div>
            </div>                
            <div className='Landingblurb'>
                <div className='Landingimage-three'>
                    <h4>Contact Us</h4>
                </div>
                <div className='large-screen-blurb'>
                    <h4 className='large-screen-prompt'>Contact Us</h4>
                    <p className='Landing-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam hendrerit, leo at eleifend 
                    volutpat, ipsum lorem mollis sapien, a rutrum arcu sapien eget nisl. Nunc diam nunc, ullamcorper eget orci non, porta 
                    laoreet odio. In nec sem luctus, dignissim ex a, vulputate sapien. Morbi congue leo eu diam rutrum, eu viverra mi 
                    vehicula.</p>
                </div>
            </div>
        </div>
    )
}

export default About;