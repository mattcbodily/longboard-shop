import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import PartDisplay from '../PartDisplay';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import {updateDesign, updateGrip} from '../../../ducks/reducer';
import './Design.css';

class Design extends Component {
    constructor(props){
        super(props);
        this.state = {
            designs: []
        }
    }

    componentDidMount(){
        this.handleGetDesigns()
    }

    handleGetDesigns = () => {
        axios.get('/api/board-design')
        .then(res => {
            this.setState({
                designs: res.data
            })
        })
    }

    handleSelectedItem = async(e, name, image, price, id) => {
        await this.props.updateDesign({name, image, price, id})
        this.props.updateGrip({
            name: this.props.grip.name, 
            image: `https://s3-us-west-1.amazonaws.com/old-dog-new-trick-longboards-bucket/${this.props.design.name}_${this.props.grip.name}.png`, 
            price: this.props.grip.price,
            id: this.props.grip.id
        })
    }

    handleGripLink = () => {
        if(this.props.design.name){
            this.props.history.push('/board-grip')
        } else {
            alert('Please select parts from previous steps first')
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
        const mappedParts = this.state.designs.map((design, i) => {
            return(
                <PartDisplay 
                    key = {i}
                    part = {design}
                    selectPart = {this.handleSelectedItem} />
            )
        })
        return (
            <div className='Design'>
                <ButtonGroup>
                    <div className='customize-step-prompt'>
                        Step:
                    </div>
                    <Button bsPrefix='active-customize-step-btn'>1</Button>
                    <Button bsPrefix='active-desktop-customize-step-btn'>Design</Button>
                    <Button bsPrefix='customize-step-btn' onClick={this.handleGripLink}>2</Button>
                    <Button bsPrefix='desktop-customize-step-btn' onClick={this.handleGripLink}>Grip</Button>
                    <Button bsPrefix='customize-step-btn' onClick={this.handleTrucksLink}>3</Button>
                    <Button bsPrefix='desktop-customize-step-btn' onClick={this.handleTrucksLink}>Trucks</Button>
                    <Button bsPrefix='customize-step-btn' onClick={this.handleWheelsLink}>4</Button>
                    <Button bsPrefix='desktop-customize-step-btn' onClick={this.handleWheelsLink}>Wheels</Button>
                    <Button bsPrefix='customize-step-btn' onClick={this.handleGraphicLink}>5</Button>
                    <Button bsPrefix='desktop-customize-step-btn' onClick={this.handleGraphicLink}>Graphics</Button>
                </ButtonGroup>
                <div className='custom-flex-div'>
                    <div className='custom-board-image-div'>
                        {this.props.design.name
                            ? (<div>
                                <img src={this.props.design.image} alt='design' className={`selected-board`}/>
                                </div>)
                            :  null
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
    const {design, grip, trucks, wheels} = reduxState
    return {
        design,
        grip,
        trucks,
        wheels
    }
}

const mapDispatchToProps = {
    updateDesign,
    updateGrip
}

export default connect(mapStateToProps, mapDispatchToProps)(Design);