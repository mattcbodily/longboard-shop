import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './AuthModal.css';

class LoginAuthModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    handleLogin = async() => {
        const {email, password} = this.state;
        await axios.post('/auth/login', {email, password})
        .then(res => {
            this.props.login(res.data)
        })
        if(this.props.user.user_id){
            this.props.toggle()
        }
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

    render(){
        return(
            <div className='modal-background'>
                <div className='authentication-modal'>
                    <h6>Please Sign in or <Link to='/register'>Register</Link></h6>
                    <div>
                        <input 
                            placeholder='Email'
                            maxLength='250'
                            value={this.state.email}
                            onChange={(e) => this.handleEmailInput(e.target.value)}/>
                    </div>
                    <div>
                        <input 
                            placeholder='Password'
                            type='password'
                            maxLength='40'
                            value={this.state.password}
                            onChange={(e) => this.handlePasswordInput(e.target.value)}/>
                    </div>
                    <button className='login-modal-button' onClick={this.handleLogin}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginAuthModal;