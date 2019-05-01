import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
library.add(faBars)

class Header extends Component {
    constructor(){
        super()
        this.state = {
            showDrawer: false
        }
    }

    handleToggle(){
        this.setState({
            showDrawer: !this.state.showDrawer
        })
    }

    render(){
        return (
            <div>
            {!this.state.showDrawer
            ? (<div>
                    <div className='Header'>
                        <FontAwesomeIcon icon="bars" className="Bars" onClick={() => this.handleToggle()} />
                        <Link to='/' className='Logotext'><span>O.D.N.T</span></Link>
                    </div>
                </div>) 
            : (<div>
                    <div className='Header'>
                        <FontAwesomeIcon icon="bars" className="Bars" onClick={() => this.handleToggle()} />
                        <Link to='/' className='Logotext'><span>O.D.N.T</span></Link>                    
                    </div>
                    <div className='Dropdownmenu'>
                        <Link to='/' onClick={() => this.handleToggle()} className="Headerlinks"><p className='Dropdownlinks'>Home</p></Link>
                        <Link to='/boards' onClick={() => this.handleToggle()} className="Headerlinks"><p className='Dropdownlinks'>Our Boards</p></Link>
                        <Link to='/customize' onClick={() => this.handleToggle()} className="Headerlinks"><p className='Dropdownlinks'>Build Your Own</p></Link>
                        <Link to='/about' onClick={() => this.handleToggle()} className="Headerlinks"><p className='Dropdownlinks'>About/Contact</p></Link>
                    </div>
                </div>
                )
                }
            </div>
        )
    }
}

export default Header;