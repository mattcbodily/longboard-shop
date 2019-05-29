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
            <div className='user-cart'>
                    {!this.props.cart.custom
                    ?(<img src={testpicture} alt='test' className='cart-item-picture'/>)
                    :(<img src={testpicture} alt='test' className='cart-item-picture'/>)
                    }
                <div className='cart-information'>
                    <div className='cart-longboard-title'>
                        <span>{this.props.cart.longboard_title}</span>
                        <FontAwesomeIcon icon="times" onClick={this.handleDeleteItem} className='delete-cart-item'/>
                    </div>
                    <div className='cart-flexed-information'>
                        <div className='cart-price'>
                            <p className='cart-data'>${this.props.cart.order_item_price}</p>
                        </div>
                        <div className='cart-qty-div'>
                            <DropdownButton alignRight title={`Qty: ${this.props.cart.quantity}`} bsPrefix='qty-dropdownbutton'>
                                <p onClick={this.handleQuantityDown}>1</p>
                                <Dropdown.Divider />
                                <p onClick={this.handleQuantityUp}>2</p>
                            </DropdownButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartDisplay;