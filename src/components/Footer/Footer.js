import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css';

const Footer = () => {
    return (
        <div>
            <Navbar bg='dark' fixed='bottom' style={{display: 'inline-block'}}>
                <p className='Copyright'>©2019 by Aaron Kahle</p>
            </Navbar>
        </div>
    )
}

export default Footer;