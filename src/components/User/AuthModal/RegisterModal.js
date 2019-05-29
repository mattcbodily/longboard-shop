import React, {Component} from 'react';
import axios from 'axios';
import './AuthModal.css';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            verPassword: ''
        }
    }

    handleInput(prop, val){
        this.setState({
            [prop]: val
        })
    }

    handleRegister = () => {
        const {email, password, verPassword} = this.state;
        if(password !== verPassword){
            alert('Passwords Do Not Match')
        } else {
            axios.post('/auth/register', {email, password})
            .then(res => {
                this.props.history.push('/order-history')
        })}
    }

    render(){
        const {email, password, verPassword} = this.state;

        return(
            <div className='register'>
                <div className='modal-background'>
                    <div className='authentication-modal'>
                        <h6>Please Register Below</h6>
                        <div>
                            <input 
                                placeholder='Email'
                                maxLength='250'
                                value={email}
                                onChange={e => this.handleInput('email', e.target.value)}/>
                        </div>
                        <div>
                            <input
                                value={password}
                                maxLength='40'
                                type='password' 
                                placeholder='Password'
                                onChange={e => this.handleInput('password', e.target.value)}/>
                        </div>
                        <div>
                            <input
                                value={verPassword}
                                maxLength='40'
                                type='password' 
                                placeholder='Verify Password'
                                onChange={e => this.handleInput('verPassword', e.target.value)}/>
                        </div>
                        <button onClick={this.handleRegister} className='login-modal-button'>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;