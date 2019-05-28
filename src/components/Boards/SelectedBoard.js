import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {updateDesign, updateGrip, updateTrucks, updateWheels} from './../../ducks/reducer';

class SelectedBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            board: [],
            designName: '',
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

    handleGetGrip = () => {
        axios.get(`/api/selected-grip/${this.state.board[0].longboard_grip}`)
        .then(res => {
            let grip = res.data[0]
            this.props.updateGrip({name: grip.part_name, image: `https://s3-us-west-1.amazonaws.com/old-dog-new-trick-longboards-bucket/${this.state.designName}_${grip.part_name}.png`, price: grip.price, id: grip.id})
        })
    }

    handleGetTrucks = () => {
        axios.get(`/api/selected-trucks/${this.state.board[0].longboard_trucks}`)
        .then(res => {
            let trucks = res.data[0]
            this.props.updateTrucks({name: trucks.part_name, image: trucks.part_image, price: trucks.price, id: trucks.id})
        })
    }

    handleGetWheels = () => {
        axios.get(`/api/selected-wheels/${this.state.board[0].longboard_wheels}`)
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
                <Button bsPrefix='mobile-customize-board-btn' onClick={this.handleCustomize}>Customize</Button>
            </ButtonGroup>
            <Button bsPrefix='customize-board-btn'onClick={this.handleCustomize}>Customize</Button>
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

const mapDispatchToProps = {
    updateDesign,
    updateGrip,
    updateTrucks,
    updateWheels
}

export default connect(null, mapDispatchToProps)(SelectedBoard);