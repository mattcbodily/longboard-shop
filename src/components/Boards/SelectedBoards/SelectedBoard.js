import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import AuthModal from './../../User/AuthModal/AuthModal';
import BoardBar from './BoardBar';
import {updateDesign, updateGrip, updateTrucks, updateWheels} from '../../../ducks/reducer';
import './SelectedBoard.css';

class SelectedBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {},
            board: [],
            allBoards: [],
            designName: '',
            qty: 1,
            showModal: false
        }
    }

    componentDidMount(){
        this.handleGetBoard();
        this.handleGetBoardBar();
        this.handleGetSessionUser();
    }

    handleGetSessionUser = () => {
        axios.get('/auth/session-user')
        .then(res => {
            this.setState({
                user: res.data
            })
        }) 
    }

    handleGetBoardBar = () => {
        axios.get('/api/board-bar')
        .then(res => {
            this.setState({
                allBoards: res.data
            })
        })
    }

    handleLogin = (data) => {
        this.setState({
            user: data
        })
    }

    handleToggle = () => {
        this.setState({
            showModal: !this.state.showModal
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

    handleGetBoard = () => {
        axios.get(`/api/selected-board/${this.props.match.params.boardname}`)
        .then(res => {
            this.setState({
                board: res.data
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

    handleGetDesign = async() => {
        await axios.get(`/api/selected-design/${this.state.board[0].longboard_design}`)
        .then(res => {
            let design = res.data[0]
            this.setState({
                designName: design.part_name
            })
            this.props.updateDesign({name: design.part_name, image: design.part_image, price: design.price, id: design.id})
        })
    }

    handleGetGrip = async() => {
        await axios.get(`/api/selected-grip/${this.state.board[0].longboard_grip}`)
        .then(res => {
            let grip = res.data[0]
            this.props.updateGrip({name: grip.part_name, image: `https://s3-us-west-1.amazonaws.com/old-dog-new-trick-longboards-bucket/${this.state.designName}_${grip.part_name}.png`, price: grip.price, id: grip.id})
        })
    }

    handleGetTrucks = async() => {
        await axios.get(`/api/selected-trucks/${this.state.board[0].longboard_trucks}`)
        .then(res => {
            let trucks = res.data[0]
            this.props.updateTrucks({name: trucks.part_name, image: trucks.part_image, price: trucks.price, id: trucks.id})
        })
    }

    handleGetWheels = async() => {
        await axios.get(`/api/selected-wheels/${this.state.board[0].longboard_wheels}`)
        .then(res => {
            let wheels = res.data[0]
            this.props.updateWheels({color: wheels.part_name, image: wheels.part_image, price: wheels.price, id: wheels.id})            
        })
    }

    handleCustomize = async() => {
        await this.handleGetDesign();
        await this.handleGetGrip();
        await this.handleGetTrucks();
        await this.handleGetWheels();
        this.props.history.push('/wheels');
    }

    handleQtyUp = () => {
        this.setState({
            qty: 2
        })
    }

    handleQtyDown = () => {
        this.setState({
            qty: 1
        })
    }
 
    render(){
        const mappedBoard = this.state.board.map((board, i) => {
            return(
                <div key={i}>
                    <Carousel interval='60000'>
                        <Carousel.Item>
                            <img src={board.longboard_picture} alt='longboard' className='selected-board-image-one'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={board.longboard_picture} alt='longboard' className='selected-board-image-two'/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src={board.longboard_picture} alt='longboard' className='selected-board-image-three'/>
                        </Carousel.Item>
                    </Carousel>
                <ButtonGroup>
                <div className='selected-board-price'>
                    ${(board.price * this.state.qty)}
                </div>
                <DropdownButton title = {`Qty: ${this.state.qty}`} bsPrefix='selected-board-dropdownbutton'>
                    <Dropdown.Item onClick={this.handleQtyDown}>1</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item onClick={this.handleQtyUp}>2</Dropdown.Item>
                </DropdownButton>
                <Button bsPrefix='selected-board-btn' onClick={this.handleAddToCart}>Add to Cart</Button>
                <Button bsPrefix='customize-board-btn' onClick={this.handleCustomize}>Customize</Button>
            </ButtonGroup>
            <Button bsPrefix='mobile-customize-board-btn'onClick={this.handleCustomize}>Customize</Button>
            <div className='selected-board-description'>
                <h6>{board.longboard_title}</h6>
                <p>{board.extended_description}</p>
            </div>
            </div>
            )
        })
        const mapAllBoards = this.state.allBoards.map((board, i) => {
            return (
                <BoardBar 
                    key={i}
                    board={board}
                    getBoard={this.handleBoardBarLink} />
            )
        })
        return(
            <div className='desktop-view'>
                <div className='selected-boards-flex'>
                    <div className='selected-boards'>
                        {mappedBoard}
                        {this.state.showModal
                        ?(<AuthModal 
                            user={this.state.user}
                            login={this.handleLogin}
                            toggle={this.handleToggle} />)
                        :(null)}
                    </div>
                    <div className='board-bar'>
                        <p>Other Popular Boards</p>
                        {mapAllBoards}
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    updateDesign,
    updateGrip,
    updateTrucks,
    updateWheels
}

export default connect(null, mapDispatchToProps)(SelectedBoard);