import React, {Component} from 'react';
import './User.css';

class User extends Component {
    render(){
        return(
            <div className='user'>
                <div className='user-information'>
                    Basic, editable user information goes here
                </div>
                <h6>Your Order History</h6>
                <div className='order-history'>
                    <div className='order-history-picture'>

                    </div>
                    <div className='order-history-information'>
                        <div className='order-history-longboard-title'>
                            Longboard Title
                        </div>
                        <div className='order-history-flexed-information'>
                            <div className='order-history-price'>
                                Price
                            </div>
                            <div className='order-qty-date'>
                                <div className='order-history-qty'>
                                    Qty
                                </div>
                                <div className='order-history-date'>
                                    Date
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User;