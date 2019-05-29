import React, {Component} from 'react';
import axios from 'axios';
import CartDisplay from './CartDisplay';
import Checkout from './Checkout';
import BoardBar from './../Boards/SelectedBoards/BoardBar';
import './Cart.css';

class Cart extends Component {
    constructor(){
        super();
        this.state = {
            user: {},
            orderItems: [],
            boards: [],
            total: 0.00
        }
    }

    componentDidMount(){
        this.handleGetUser();
        this.handleGetBoardBar();
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

    handleGetBoardBar = () => {
        axios.get('/api/board-bar')
        .then(res => {
            this.setState({
                boards: res.data
            })
        })
    }

    handleBoardBarLink = (e, board) => {
        axios.get(`/api/selected-board/${board}`)
        .then(res => {
            this.setState({
                board: res.data
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
        const mapAllBoards = this.state.boards.map((board, i) => {
            return (
                <BoardBar 
                    key={i}
                    board={board}
                    getBoard={this.handleBoardBarLink} />
            )
        })
        return(
            <div className='cart-flex'>
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
                </div>
                <div className='board-bar'>
                    <p>Other Popular Boards</p>
                    {mapAllBoards}
                </div>
            </div>
        )
    }
}

export default Cart;