import React, {Component} from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import CartDisplay from './CartDisplay';
import './Cart.css';
const {PUBLIC_KEY} = process.env;

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

    onToken = (token) => {
        token.card = void 0;
        axios.post('/api/payment', {token, amount: Math.round(this.state.total * 100)})
        .then(res => {
            
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
                <StripeCheckout 
                    label="Proceed to Checkout"
                    token={this.onToken}
                    stripeKey={'pk_test_3w9I5R57sN1cSXpoTtYhF8tR00x2mEnQXV'}
                    amount={Math.round(this.state.total * 100)}
                    shippingAddress={true}
                    billingAddress={true}/>
                {mappedCart}
            </div>
        )
    }
}

export default Cart;