import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import testpicture from './the-nigmatic-263109-unsplash.jpg';
import './Boards.css';

class Boards extends Component {
    constructor(props){
        super(props);
        this.state = {
            boards: [],
            user: {},
            email: '',
            password: '',
            showModal: false
        }
    }

    componentDidMount(){
        axios.get('/auth/get-session-user')
        .then(res => {
            this.setState({
                user: res.data
            })
        }) 
        this.handleGetBoards();
    }

    handleGetBoards = () => {
        axios.get('/api/standard-boards')
        .then(res => {
            this.setState({
                boards: res.data
            })
        })
    }

    handleFilterPriceLow = () => {
        axios.get('/api/boards-price-filter-low')
        .then(res => {
            this.setState({
                boards: res.data
            })
        })
    }

    handleFilterPriceHigh = () => {
        axios.get('/api/boards-price-filter-high')
        .then(res => {
            this.setState({
                boards: res.data
            })
        })
    }

    render(){
        const mappedBoards = this.state.boards.map((board, i) => {
            return(
                <Card bsPrefix='custom-card' key={i}>
                    <Card.Img variant="top" src={testpicture} style={{height: '165px', borderRadius: '10px 10px 0px 0px'}} />
                    <Card.Body>
                        <Card.Title>{board.longboard_title}, {board.price}</Card.Title>
                        <Card.Text>
                            {board.longboard_description}
                        </Card.Text>
                        <ButtonGroup bsPrefix='card-btn-group'>
                            <Link to={`/board/${board.longboard_title}`}><Button bsPrefix='boards-custom-btn1'>More Info</Button></Link>
                            <Button bsPrefix='boards-custom-btn2'>Add to Cart</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            )
        })
        return(
            <div className='Boards'>
                <div className='Filter-group'>
                <ButtonGroup>
                    <div className='Filterby'>
                        Filter by:
                    </div>
                    <DropdownButton alignRight title='Design' bsPrefix='Filter-dropdownbutton'>
                            <div className='Dropdown-option-div'><Link to='/pintail-boards' className='Design-links'>Pintail</Link></div>
                            <Dropdown.Divider />
                            <div className='Dropdown-option-div'><Link to='/drop-boards' className='Design-links'>Drop</Link></div>
                    </DropdownButton>
                    <DropdownButton alignRight title='Price' bsPrefix='Filter-dropdownbutton'>
                        <div onClick={this.handleFilterPriceHigh} className='Dropdown-option-div'>High to Low</div>
                        <Dropdown.Divider />
                        <div onClick={this.handleFilterPriceLow} className='Dropdown-option-div'>Low to High</div>
                    </DropdownButton>
                </ButtonGroup>
                </div>
                <div className='boardsflex'>
                    {mappedBoards}
                </div>
            </div>
        )
    }
}

export default Boards;