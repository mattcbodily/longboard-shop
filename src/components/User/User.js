import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import OrderHistory from './OrderHistory';
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
            editEmail: false,
            editPassword: false
        }
    }

    componentDidMount(){
        this.handleGetUser()
    }

    handleEmailInput(val){
        this.setState({
            email: val
        })
    }

    handlePasswordInput(val){
        this.setState({
            password: val
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
        await axios.get('/auth/get-session-user')
        .then(res => {
            this.setState({
                user: res.data
            })
        })
        this.handleOrderHistory()  
    }

    handleLogin = async() => {
        const {email, password} = this.state;
        await axios.post('/auth/login', {email, password})
        .then(res => {
            this.setState({
                user: res.data
            })
        })
        this.handleOrderHistory();
        this.setState({
            email: '',
            password: ''
        })
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
        axios.put(`/auth/update-password/${this.state.user.user_id}`, {password: this.state.password})
        .then(res => {

        })
        this.handlePasswordToggle();
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
                <div className='user-information'>
                    {!this.state.editEmail
                    ? ( <div>
                            <p>Email: {this.state.user.email} <FontAwesomeIcon icon="edit" onClick={this.handleEmailToggle}/></p>
                        </div>)
                    : ( <div>
                            <input 
                                placeholder='Enter New Email'
                                value={this.state.email}
                                onChange={(e) => this.handleEmailInput(e.target.value)}
                                maxLength='250'/>
                            <FontAwesomeIcon icon="check" onClick={this.handleEmailUpdate}/>
                            <FontAwesomeIcon icon="times" onClick={this.handleEmailToggle}/>
                        </div>)}
                    {!this.state.editPassword
                    ? ( <div>
                            <p>Password: Password Not Shown <FontAwesomeIcon icon="edit" onClick={this.handlePasswordToggle}/></p>
                        </div>)
                    : ( <div>
                            <input 
                                placeholder='Enter New Password'
                                type='password'
                                value={this.state.password}
                                onChange={(e) => this.handlePasswordInput(e.target.value)}
                                maxLength='40' />
                            <FontAwesomeIcon icon="check" onClick={this.handlePasswordUpdate}/>
                            <FontAwesomeIcon icon="times" onClick={this.handlePasswordToggle}/>
                        </div>
                    )}
                </div>
                <h6>Your Order History</h6>
                {mappedOrders}
            </div>) : (
                <div>
                    <h6>Please sign in to view your order history</h6>
                    <p className='register-link'>Don't have an account? <Link to='/register'>Register here</Link></p>
                    <div>
                        <input 
                            placeholder='Email'
                            value={this.state.email}
                            maxLength='250'
                            onChange={(e) => this.handleEmailInput(e.target.value)}/>
                    </div>
                    <div>
                        <input 
                            placeholder='Password'
                            type='password'
                            value={this.state.password}
                            maxLength='40'
                            onChange={(e) => this.handlePasswordInput(e.target.value)}/>
                    </div>
                    <button onClick={this.handleLogin}>Login</button>
                </div>
            )}
            </div>
        )
    }
}

export default User;