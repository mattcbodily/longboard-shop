import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons';
library.add(faBars, faShoppingCart, faUser)

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
                    <header className='Header'>
                        <div>
                            <FontAwesomeIcon icon="bars" className="Bars" onClick={() => this.handleToggle()} />
                            <Link to='/' className='Logotext'><span>O.D.N.T</span></Link>
                        </div>
                        <div>
                            <Link to='/order-history' onClick={this.handleModalToggle}><FontAwesomeIcon icon="user" className="user-icon"/></Link>
                            <Link to='/cart'><FontAwesomeIcon icon="shopping-cart" className="shopping-cart"/></Link>
                        </div>
                    </header>
                </div>) 
            : (<div>
                    <header className='Header'>
                        <div>
                            <FontAwesomeIcon icon="bars" className="Bars" onClick={() => this.handleToggle()} />
                            <Link to='/' className='Logotext'><span>O.D.N.T</span></Link>
                        </div>
                        <div>
                            <Link to='/order-history'><FontAwesomeIcon icon="user" className="user-icon"/></Link>
                            <Link to='/cart'><FontAwesomeIcon icon="shopping-cart" className="shopping-cart"/></Link>
                        </div>               
                    </header>
                    <nav className='Dropdownmenu'>
                        <Link to='/' onClick={() => this.handleToggle()} className="Headerlinks"><p className='Dropdownlinks'>Home</p></Link>
                        <Link to='/boards' onClick={() => this.handleToggle()} className="Headerlinks"><p className='Dropdownlinks'>Our Boards</p></Link>
                        <Link to='/customize' onClick={() => this.handleToggle()} className="Headerlinks"><p className='Dropdownlinks'>Build Your Own</p></Link>
                        <Link to='/order-history' onClick={() => this.handleToggle()} className="Headerlinks"><p className='Dropdownlinks'>Order History</p></Link>
                        <Link to='/about' onClick={() => this.handleToggle()} className="Headerlinks"><p className='Dropdownlinks'>About/Contact</p></Link>
                    </nav>
                </div>
                )
                }
            </div>
        )
    }
}

export default Header;