import React, {Component} from 'react';
import './Cart.css';

class Cart extends Component {
    constructor(){
        super();
        this.state = {
            total: 0.00
        }
    }
    render(){
        return(
            <div className='cart'>
                <h6>Your Total: ${this.state.total}</h6>
            </div>
        )
    }
}

export default Cart;