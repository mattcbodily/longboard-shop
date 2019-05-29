import React, {Component} from 'react';
import axios from 'axios';
import OrderHistory from './OrderHistory';
import LoginAuthModal from './AuthModal/LoginAuthModal';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import './User.css';
library.add(faEdit, faTimes, faCheck)

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            orders: [],
            email: '',
            password: '',
            verPassword: '',
            editEmail: false,
            editPassword: false
        }
    }

    componentDidMount(){
        this.handleGetUser()
    }

    handleInput(prop, val){
        this.setState({
            [prop]: val
        })
    }

    handleEmailToggle = () => {
        this.setState({
            editEmail: !this.state.editEmail
        })
    }

    handlePasswordToggle = () => {
        this.setState({
            editPassword: !this.state.editPassword
        })
    }

    handleGetUser = async() => {
        await axios.get('/auth/session-user')
        .then(res => {
            this.setState({
                user: res.data
            })
        })
        this.handleOrderHistory()  
    }

    handleLogin = async(data) => {
        await this.setState({
            user: data
        })
        this.handleOrderHistory();
    }

    handleOrderHistory = () => {
        axios.get(`/api/order-history/${this.state.user.user_id}`)
        .then(res => {
            this.setState({
                orders: res.data
            })
        })
    }

    handleEmailUpdate = () => {
        axios.put(`/auth/update-email/${this.state.user.user_id}`, {email: this.state.email})
        .then(res => {
            
        })
        this.handleEmailToggle();
    }

    handlePasswordUpdate = () => {
        const {password, verPassword, user} = this.state;
        if(password !== verPassword){
            alert('Passwords Do Not Match')
        } else {
            axios.put(`/auth/update-password/${user.user_id}`, {password: password})
            .then(res => {

            })
            this.handlePasswordToggle();
        }
    }

    render(){
        const mappedOrders = this.state.orders.map((order, i) => {
            return (
                <OrderHistory 
                    key={i}
                    order={order}/>
            )
        })
        return(
            <div className='user'>
            {this.state.user.user_id
            ? (<div> 
                <h6>Your Information</h6>
                <div className='user-information'>
                    {!this.state.editEmail
                    ? ( <div>
                            <p>Email: {this.state.user.email} <FontAwesomeIcon icon="edit" onClick={this.handleEmailToggle}/></p>
                        </div>)
                    : ( <div>
                            <input 
                                placeholder='Enter New Email'
                                value={this.state.email}
                                onChange={(e) => this.handleInput('email', e.target.value)}
                                maxLength='250'
                                className='edit-inputs' />
                            <FontAwesomeIcon icon="check" onClick={this.handleEmailUpdate} className='edit-icons'/>
                            <FontAwesomeIcon icon="times" onClick={this.handleEmailToggle} className='edit-icons'/>
                        </div>)}
                    {!this.state.editPassword
                    ? ( <div>
                            <p>Password: Password Not Shown <FontAwesomeIcon icon="edit" onClick={this.handlePasswordToggle}/></p>
                        </div>)
                    : ( <div>
                            <input 
                                placeholder='New Password'
                                type='password'
                                value={this.state.password}
                                onChange={(e) => this.handleInput('password', e.target.value)}
                                maxLength='40'
                                className='edit-inputs' />
                            <input 
                                placeholder='Verify Password'
                                type='password'
                                value={this.state.verPassword}
                                onChange={(e) => this.handleInput('verPassword', e.target.value)}
                                maxLength='40'
                                className='edit-inputs' />
                            <FontAwesomeIcon icon="check" onClick={this.handlePasswordUpdate} className='edit-icons'/>
                            <FontAwesomeIcon icon="times" onClick={this.handlePasswordToggle} className='edit-icons'/>
                        </div>
                    )}
                </div>
                <h6>Your Order History</h6>
                {mappedOrders}
            </div>) : (
                <LoginAuthModal 
                    user={this.state.user} 
                    login={this.handleLogin}
                    toggle={this.handleToggle}/>
            )}
            </div>
        )
    }
}

export default User;