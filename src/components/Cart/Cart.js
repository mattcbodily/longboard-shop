import React, {Component} from 'react';
import axios from 'axios';
import CartDisplay from './CartDisplay';
import Checkout from './Checkout';
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

    handleCompleteOrder = () => {
        const orderObj = {
            order_id: this.state.user.order_id,
            user_id: this.state.user.user_id
        }
        axios.post('/api/complete-order', orderObj)
        .then(res => {
            axios.get('/auth/get-session-user')
            .then(res => {
                this.setState({
                    user: res.data
                })
                this.handleGetUserCart();
            })
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
                <div onClick={this.handleCompleteOrder}>
                    <Checkout 
                        total={Math.round(this.state.total * 100)}/>
                </div>
                {mappedCart}
            </div>
        )
    }
}

export default Cart;