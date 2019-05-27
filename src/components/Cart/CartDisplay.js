import React, {Component} from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import testpicture from './../Boards/the-nigmatic-263109-unsplash.jpg';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
library.add(faTimes)



class CartDisplay extends Component {
    handleQuantityUp = () => {
        const quantityObj = {
            quantity: 2,
            price: this.props.cart.price * 2
        }
        axios.put(`/api/item-quantity/${this.props.cart.order_item_id}`, quantityObj)
        .then(res => {
            this.props.getCart();
        })
        this.props.getCart();
    }

    handleQuantityDown = () => {
        const quantityObj = {
            quantity: 1,
            price: this.props.cart.price
        }
        axios.put(`/api/item-quantity/${this.props.cart.order_item_id}`, quantityObj)
        .then(res => {
            this.props.getCart();
        })
    }

    handleDeleteItem = () => {
        axios.delete(`/api/cart-item/${this.props.cart.order_item_id}`)
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
                                <p className='order-information'>${this.props.cart.order_item_price}</p>
                            </div>
                            <div className='order-qty-date'>
                                <DropdownButton alignRight title={`Qty: ${this.props.cart.quantity}`} bsPrefix='qty-dropdownbutton'>
                                    <p onClick={this.handleQuantityDown}>1</p>
                                    <Dropdown.Divider />
                                    <p onClick={this.handleQuantityUp}>2</p>
                                </DropdownButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartDisplay;