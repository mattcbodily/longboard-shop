import React, {Component} from 'react';
import axios from 'axios';
import './Cart.css';

class Cart extends Component {
    constructor(){
        super();
        this.state = {
            orderItems: [],
            user: {},
            total: 0.00
        }
    }

    componentDidMount(){
        axios.get('/auth/get-session-user')
        .then(res => {
            this.setState({
                user: res.data
            })
            this.handleGetUserCart();
        })
    }

    handleGetUserCart = () => {
        axios.get(`/api/user-cart/${this.state.user.user_id}`)
        .then(res => {
            console.log(res)
            this.setState({
                orderItems: res.data
            })
        })
    }

    render(){
        console.log(this.state.user)
        console.log(this.state.orderItems)
        return(
            <div className='cart'>
                <h6>Your Total: ${this.state.total}</h6>
            </div>
        )
    }
}

export default Cart;