import React, {Component} from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class SelectedBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            board: [],
            qty: 1
        }
    }

    componentDidMount(){
        this.handleGetBoard()
    }

    handleGetBoard = () => {
        axios.get(`/api/selected-board/${this.props.match.params.boardname}`)
        .then(res => {
            this.setState({
                board: res.data
            })
        })
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
                <ButtonGroup>
                <div className='selected-board-price'>
                    ${(board.price * this.state.qty)}
                </div>
                <DropdownButton title = {`Qty: ${this.state.qty}`} bsPrefix='selected-board-dropdownbutton'>
                    <Dropdown.Item onClick={this.handleQtyDown}>1</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item onClick={this.handleQtyUp}>2</Dropdown.Item>
                </DropdownButton>
                <Button bsPrefix='selected-board-btn'>Add to Cart</Button>
                <Button bsPrefix='mobile-customize-board-btn'>Customize</Button>
            </ButtonGroup>
            <Button bsPrefix='customize-board-btn'>Customize</Button>
            <div className='selected-board-description'>
                <h6>{board.longboard_title}</h6>
                <p>Tri-tip spare ribs frankfurter sausage pork loin biltong doner pork belly venison alcatra salami ball tip 
                beef ribs pancetta tongue. Rump pork chop tail alcatra pork chuck pork belly ham hock beef ribs jowl bresaola 
                chicken beef sirloin t-bone. Boudin sausage kielbasa, andouille pig strip steak tail kevin. Corned beef chicken doner 
                strip steak ball tip jowl.</p>
            </div>
            </div>
            )
        })
        return(
            <div className='selected-boards'>
                <Carousel interval='60000'>
                    <Carousel.Item>
                        <div className='Carouselimage-one'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='Carouselimage-two'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='Carouselimage-three'/>
                    </Carousel.Item>
                </Carousel>
                {mappedBoard}
            </div>
        )
    }
}

export default SelectedBoard;