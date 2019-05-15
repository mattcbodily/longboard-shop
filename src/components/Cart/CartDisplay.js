import React, {Component} from 'react';
import axios from 'axios';
import testpicture from './../Boards/the-nigmatic-263109-unsplash.jpg';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
library.add(faTimes)



class CartDisplay extends Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: this.props.cart.quantity
        }
    }
    
    handleQuantity = () => {
        const quantityObj = {
            quantity: this.state.quantity
        }
        axios.put(`/api/update-item-quantity${this.props.cart.order_item_id}`, quantityObj)
        .then(res => {
            this.props.getCart();
        })
    }

    handleDeleteItem = () => {
        axios.delete(`/api/delete-cart-item/${this.props.cart.order_item_id}`)
        .then(res => {
            this.props.getCart();
        })
    }

    render(){
        return (
            <div>
                {/* using the styling from users.css for display of the cart */}
                <div className='order-history'>
                    <div className='order-history-picture-div'>
                        <img src={testpicture} alt='test' className='order-item-picture'/>
                    </div>
                    <div className='order-history-information'>
                        <div className='order-history-longboard-title'>
                            <span className='order-information'>{this.props.cart.longboard_title}</span>
                            <FontAwesomeIcon icon="times" onClick={this.handleDeleteItem} />
                        </div>
                        <div className='order-history-flexed-information'>
                            <div className='order-history-price'>
                                <p className='order-information'>${this.props.cart.price * this.props.cart.quantity}</p>
                            </div>
                            <div className='order-qty-date'>
                                <p className='order-information'>Qty: {this.props.cart.quantity}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartDisplay;