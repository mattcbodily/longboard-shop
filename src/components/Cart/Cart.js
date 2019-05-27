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
            customOrderItems: [],
            user: {},
            total: 0.00
        }
    }

    componentDidMount(){
        this.handleGetUser();
    }

    handleGetUserCart = async() => {
        await axios.get(`/api/user-cart/${this.state.user.user_id}`)
        .then(res => {
            this.setState({
                orderItems: res.data
            })
        })
        await axios.get(`/api/user-cart-custom/${this.state.user.user_id}`)
        .then(res => {
            this.setState({
                customOrderItems: res.data
            })
        })
        let sum = this.state.orderItems.reduce((acc, curr) => {
            return acc + parseFloat(curr.order_item_price)
        }, 0)
        let customSum = this.state.customOrderItems.reduce((acc, curr) => {
            return acc + parseFloat(curr.order_item_price)
        }, 0)
        this.setState({
            total: Math.round((sum + customSum) * 100) / 100
        })
    }

    handleGetUser = () => {
        axios.get('/auth/session-user')
        .then(res => {
            this.setState({
                user: res.data
            })
            this.handleGetUserCart();
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
        const mappedCartCustomItems = this.state.customOrderItems.map((item, i) => {
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
                        total={Math.round(this.state.total * 100)}
                        getUser={this.handleGetUser} 
                        order={this.state.user.order_id}
                        user={this.state.user.user_id} />
                </div>
                {mappedCart}
                {mappedCartCustomItems}
            </div>
        )
    }
}

export default Cart;