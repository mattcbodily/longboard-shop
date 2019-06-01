import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import GripDisplay from './GripDisplay';
import {updateGrip} from '../../../ducks/reducer';
import './BoardGrip.css';

class BoardSize extends Component {
    constructor(props){
        super(props);
        this.state = {
            grips: []
        }
    }

    componentDidMount(){
        this.handleGetGrips();
        this.handleNoDesign();
    }

    handleGetGrips = () => {
        axios.get('/api/board-grip')
        .then(res => {
            this.setState({
                grips: res.data
            })
        })
    }

    handleSelectedItem = (e, name, image, price, id) => {
        this.props.updateGrip({name, image, price, id})
    }

    handleNoDesign = () => {
        if(!this.props.design.name){
            this.props.history.push('/customize')
        }
    }

    handleTrucksLink = () => {
        if(this.props.design.name && this.props.grip.name){
            this.props.history.push('/trucks')
        } else {
            alert('Please select parts from previous steps first')
        }
    }

    handleWheelsLink = () => {
        if(this.props.design.name && this.props.grip.name && this.props.trucks.name){
            this.props.history.push('/wheels')
        } else {
            alert('Please select parts from previous steps first')
        }
    }

    handleGraphicLink = () => {
        if(this.props.design.name && this.props.grip.name && this.props.trucks.name && this.props.wheels.color){
            this.props.history.push('/graphics')
        } else {
            alert('Please select parts from previous steps first')
        }
    }

    render(){
        const mappedParts = this.state.grips.map((grip, i) => {
            return(
                <GripDisplay
                    key = {i}
                    part = {grip}
                    selectPart = {this.handleSelectedItem}/>
            )
        })
        return (
            <div className='Design'>
                <ButtonGroup>
                    <div className='customize-step-prompt'>
                        Step:
                    </div>
                    <Link to='/customize'>
                        <Button bsPrefix='customize-step-btn'>1</Button>
                        <Button bsPrefix='desktop-customize-step-btn'>Design</Button>
                    </Link>
                    <Button bsPrefix='active-customize-step-btn'>2</Button>
                    <Button bsPrefix='active-desktop-customize-step-btn'>Grip</Button>
                    <Button bsPrefix='customize-step-btn' onClick={this.handleTrucksLink}>3</Button>
                    <Button bsPrefix='desktop-customize-step-btn' onClick={this.handleTrucksLink}>Trucks</Button>
                    <Button bsPrefix='customize-step-btn' onClick={this.handleWheelsLink}>4</Button>
                    <Button bsPrefix='desktop-customize-step-btn' onClick={this.handleWheelsLink}>Wheels</Button>
                    <Button bsPrefix='customize-step-btn' onClick={this.handleGraphicLink}>5</Button>
                    <Button bsPrefix='desktop-customize-step-btn' onClick={this.handleGraphicLink}>Graphics</Button>
                </ButtonGroup>
                <div className='custom-flex-div'>
                    <div className='custom-board-image-div'>
                        {this.props.grip.name
                        ?  (<div>
                              <img src={this.props.design.image} alt='design' className='selected-board'/>
                              <img src={`https://s3-us-west-1.amazonaws.com/old-dog-new-trick-longboards-bucket/${this.props.design.name}_${this.props.grip.name}.png`} alt='grip' className='selected-grip'/>
                            </div>)
                        :  (<div>
                              <img src={this.props.design.image} alt='design' className='selected-board'/>
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
    const {grip, design, trucks, wheels} = reduxState
    return {
        grip,
        design,
        trucks,
        wheels
    }
}

const mapDispatchToProps = {
    updateGrip
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardSize);