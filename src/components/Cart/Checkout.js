import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Checkout extends Component {
    onToken = (token) => {
        token.card = void 0;
        axios.post('/api/payment', {token, amount: Math.round(this.props.total)})
        .then(res => {
            
        })
    }

    render(){
    return(
            <div>
                <StripeCheckout 
                    label="Proceed to Checkout"
                    token={this.onToken}
                    stripeKey={'pk_test_3w9I5R57sN1cSXpoTtYhF8tR00x2mEnQXV'}
                    amount={this.props.total}
                    shippingAddress={true}
                    billingAddress={true}/>
            </div>
        )
    }
}

export default Checkout;