import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Checkout extends Component {
    onToken = async(token) => {
        token.card = void 0;
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        await axios.post('/api/payment', {token, amount: Math.round(this.props.total), order_id: this.props.order, user_id: this.props.user, date: today})
        .then(res => {
            this.props.getUser()
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