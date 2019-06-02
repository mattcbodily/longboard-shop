import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BoardsDisplay from './BoardsDisplay';
import AuthModal from './../User/AuthModal/AuthModal';
import './Boards.css';

class Boards extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            boards: [],
            showModal: false
        }
    }

    componentDidMount(){
        this.handleGetSessionUser();
        this.handleGetBoards();
    }

    handleGetSessionUser = () => {
        axios.get('/auth/session-user')
        .then(res => {
            this.setState({
                user: res.data
            })
        }) 
    }

    handleToggle = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleLogin = (data) => {
        this.setState({
            user: data
        })
    }

    handleGetBoards = () => {
        axios.get(`/api/boards-by-design/Drop`)
        .then(res => {
            this.setState({
                boards: res.data
            })
        })
    }

    handleFilterPriceLow = () => {
        axios.get('/api/boards-low-price-filter/Drop')
        .then(res => {
            this.setState({
                boards: res.data
            })
        })
    }

    handleFilterPriceHigh = () => {
        axios.get('/api/boards-high-price-filter/Drop')
        .then(res => {
            this.setState({
                boards: res.data
            })
        })
    }

    handleAddToCart = (boardID, price) => {
        if(this.state.user.user_id) {
            const orderItem = {
                order_id: this.state.user.order_id,
                standard_product: boardID,
                quantity: 1,
                price
            }
            axios.post('/api/standard-cart-item', orderItem)
            .then(res => {
                alert('Item added successfully')
            })
        } else {
            this.handleToggle()
        }
    }

    render(){
        const mappedBoards = this.state.boards.map((board, i) => {
            return(
                <BoardsDisplay 
                    key={i}
                    board={board}
                    addToCart={this.handleAddToCart}/>
            )
        })
        return(
            <div className='Boards'>
                <div className='Filter-group'>
                <ButtonGroup bsPrefix='filter-btn-group'>
                    <div className='Filterby'>
                        Filter by:
                    </div>
                    <DropdownButton alignRight title='Design' bsPrefix='Filter-dropdownbutton'>
                            <div className='Dropdown-option-div'><Link to='/pintail-boards' className='Design-links'>Pintail</Link></div>
                            <Dropdown.Divider />
                            <div className='Dropdown-option-div'><Link to='/drop-boards' className='Design-links'>Drop</Link></div>
                    </DropdownButton>
                    <DropdownButton alignRight title='Price' bsPrefix='Filter-dropdownbutton'>
                        <Dropdown.Item onClick={this.handleFilterPriceHigh}>High to Low</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={this.handleFilterPriceLow}>Low to High</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                </div>
                <div className='boardsflex'>
                    {mappedBoards}
                </div>
                {this.state.showModal
                ?(<AuthModal
                    user={this.state.user} 
                    login={this.handleLogin}
                    toggle={this.handleToggle}/>)
                :(null)}
            </div>
        )
    }
}

export default Boards;