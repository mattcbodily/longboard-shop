import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './User.css';

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            orders: [],
            email: '',
            password: ''
        }
    }

    componentDidMount(){
        axios.get('/auth/get-session-user')
        .then(res => {
            this.setState({
                user: res.data
            })
        })  
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

    handleLogin = () => {
        const {email, password} = this.state;
        axios.post('/auth/login', {email, password})
        .then(res => {
            this.setState({
                user: res.data
            })
        })
    }

    render(){
        return(
            <div className='user'>
            {this.state.user.user_id
            ? (<div> 
                <div className='user-information'>
                    Basic, editable user information goes here
                </div>
                <h6>Your Order History</h6>
                <div className='order-history'>
                    <div className='order-history-picture'>

                    </div>
                    <div className='order-history-information'>
                        <div className='order-history-longboard-title'>
                            Longboard Title
                        </div>
                        <div className='order-history-flexed-information'>
                            <div className='order-history-price'>
                                Price
                            </div>
                            <div className='order-qty-date'>
                                <div className='order-history-qty'>
                                    Qty
                                </div>
                                <div className='order-history-date'>
                                    Date
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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