import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            verPassword: '',
            address: '',
            city: '',
            state: '',
            zipcode: ''
        }
    }

    handleInput(prop, val){
        this.setState({
            [prop]: val
        })
    }

    handleRegister = () => {
        const {email, password, verPassword, address, city, state, zipcode} = this.state;
        if(password !== verPassword){
            alert('Passwords Do Not Match')
        } else {
            axios.post('/auth/register', {email, password, address, city, state, zipcode})
            .then(res => {
                this.props.history.push('/')
        })}
    }

    render(){
        const {email, password, verPassword, mailingAddress, city, state, zipCode} = this.state;

        return(
            <div className='user'>
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
                <div>
                    <input
                        value={mailingAddress} 
                        placeholder='Shipping Address'
                        onChange={e => this.handleInput('address', e.target.value)}/>
                </div>
                <div>
                    <input
                        value={city} 
                        placeholder='City'
                        onChange={e => this.handleInput('city', e.target.value)}/>
                </div>
                <div>
                    <input
                        value={state} 
                        placeholder='State'
                        maxLength='2'
                        onChange={e => this.handleInput('state', e.target.value)}/>
                </div>
                <div>
                    <input
                        value={zipCode} 
                        placeholder='Zip Code'
                        onChange={e => this.handleInput('zipcode', e.target.value)}/>
                </div>
                <button onClick={this.handleRegister}>Register</button>
            </div>
        )
    }
}

export default Register;