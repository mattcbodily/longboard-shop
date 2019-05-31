import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import PartDisplay from '../PartDisplay';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import {updateTrucks} from '../../../ducks/reducer';
import './Trucks.css';

class Trucks extends Component {
    constructor(props){
        super(props);
        this.state = {
            trucks: []
        }
    }

    componentDidMount(){
        this.handleGetTrucks()
    }

    handleGetTrucks = () => {
        axios.get('/api/board-trucks')
        .then(res => {
            this.setState({
                trucks: res.data
            })
        })
    }

    handleSelectedItem = (e, name, image, price, id) => {
        this.props.updateTrucks({name, image, price, id})
    }

    render(){
        const mappedParts = this.state.trucks.map((truck, i) => {
            return (
                <PartDisplay 
                    key = {i}
                    part = {truck}
                    selectPart = {this.handleSelectedItem} />
            )
        })
        return (
            <div className='Design'>
                <ButtonGroup>
                    <div className='customize-step-prompt'>
                        Step:
                    </div>
                    <Link to='/customize'><Button bsPrefix='customize-step-btn'>1</Button><Button bsPrefix='desktop-customize-step-btn'>Design</Button></Link>
                    <Link to='/board-grip'><Button bsPrefix='customize-step-btn'>2</Button><Button bsPrefix='desktop-customize-step-btn'>Grip</Button></Link>
                    <Button bsPrefix='active-customize-step-btn'>3</Button>
                    <Button bsPrefix='active-desktop-customize-step-btn'>Trucks</Button>
                    <Link to='/wheels'><Button bsPrefix='customize-step-btn'>4</Button><Button bsPrefix='desktop-customize-step-btn'>Wheels</Button></Link>
                    <Link to='/graphics'><Button bsPrefix='customize-step-btn'>5</Button><Button bsPrefix='desktop-customize-step-btn'>Graphics</Button></Link>
                </ButtonGroup>
                <div className='custom-flex-div'>
                    <div className='custom-board-image-div'>
                        {!this.props.trucks.name
                        ? (<div>
                            <img src={this.props.design.image} alt='design' className='selected-board-top' />
                            <img src={this.props.design.image} alt='design' className='selected-board-bottom' />
                            <img src={this.props.grip.image} alt='grip' className='selected-board-top' />
                        </div>)
                        : (<div>
                            <img src={this.props.design.image} alt='design' className='selected-board-top' />
                            <img src={this.props.design.image} alt='design' className='selected-board-bottom' />
                            <img src={this.props.grip.image} alt='grip' className='selected-board-top' />
                            <img src={this.props.trucks.image} alt='trucks' className={`selected-trucks-top-front-${this.props.design.name}`} />
                            <img src={this.props.trucks.image} alt='trucks' className={`selected-trucks-top-back-${this.props.design.name}`} />
                            <img src={this.props.trucks.image} alt='trucks' className={`selected-trucks-bottom-front-${this.props.design.name}`} />
                            <img src={this.props.trucks.image} alt='trucks' className={`selected-trucks-bottom-back-${this.props.design.name}`} />
                        </div>)
                        }
                    </div>
                    <div className='custom-board-parts-div'>
                        <h6>Select a Part</h6>
                        {mappedParts}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {trucks, grip, design} = reduxState;
    return {
        trucks,
        grip,
        design
    }
}

const mapDispatchToProps = {
    updateTrucks
}

export default connect(mapStateToProps, mapDispatchToProps)(Trucks);