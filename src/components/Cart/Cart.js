import React, {Component} from 'react';
import axios from 'axios';
import CartDisplay from './CartDisplay';
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

    handleGetUserCart = async() => {
        await axios.get(`/api/user-cart/${this.state.user.user_id}`)
        .then(res => {
            this.setState({
                orderItems: res.data
            })
        })
        let sum = this.state.orderItems.reduce((acc, curr) => {
            return acc + parseFloat(curr.order_item_price)
        }, 0)
        this.setState({
            total: Math.round(sum * 100) / 100
        })
    }

    render(){
        const mappedCart = this.state.orderItems.map((item, i) => {
            return (
                <CartDisplay 
                    key={i}
                    cart={item}
                    getCart={this.handleGetUserCart} />
            )
        })
        return(
            <div className='cart'>
                <h6>Your Total: ${this.state.total}</h6>
                {mappedCart}
            </div>
        )
    }
}

export default Cart;