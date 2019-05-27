import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import {updateWheels} from './../../ducks/reducer';
import PartDisplay from './PartDisplay';

class Wheels extends Component {
    constructor(props){
        super(props);
        this.state = {
            wheels: []
        }
    }

    componentDidMount(){
        this.handleGetWheels()
    }

    handleGetWheels = () => {
        axios.get('/api/board-wheels')
        .then(res => {
            this.setState({
                wheels: res.data
            })
        })
    }

    handleSelectedItem = (e, color, image, price, id) => {
        this.props.updateWheels({color, image, price, id})
    }

    render(){
        const mappedParts = this.state.wheels.map((wheel, i) => {
            return (
                <PartDisplay 
                    key = {i}
                    part = {wheel}
                    selectPart = {this.handleSelectedItem}/>
            )
        })
        return (
            <div className='Design'>
                <ButtonGroup>
                    <div className='customize-step-prompt'>
                        Step:
                    </div>
                    <Link to='/customize'><Button bsPrefix='customize-step-btn'>1</Button></Link>
                    <Link to='/board-grip'><Button bsPrefix='customize-step-btn'>2</Button></Link>
                    <Link to='/trucks'><Button bsPrefix='customize-step-btn'>3</Button></Link>
                    <Button bsPrefix='active-customize-step-btn'>4</Button>
                    <Link to='/graphics'><Button bsPrefix='customize-step-btn'>5</Button></Link>
                </ButtonGroup>
                <div className='custom-board-image-div'>
                    {!this.props.wheels.color
                    ?(<div>
                        <h5 className='custom-step-name'>Select Wheels</h5>
                        <img src={this.props.design.image} alt='design' className='selected-board-top' />
                        <img src={this.props.design.image} alt='design' className='selected-board-bottom' />
                        <img src={this.props.grip.image} alt='grip' className='selected-board-top' />
                        <img src={this.props.trucks.image} alt='trucks' className={`selected-trucks-top-front-${this.props.design.name}`} />
                        <img src={this.props.trucks.image} alt='trucks' className={`selected-trucks-top-back-${this.props.design.name}`} />
                        <img src={this.props.trucks.image} alt='trucks' className={`selected-trucks-bottom-front-${this.props.design.name}`} />
                        <img src={this.props.trucks.image} alt='trucks' className={`selected-trucks-bottom-back-${this.props.design.name}`} />
                      </div>)
                    :(<div>
                        <h5 className='custom-step-name'>{this.props.wheels.color} Wheels</h5>
                        <img src={this.props.design.image} alt='design' className='selected-board-top' />
                        <img src={this.props.design.image} alt='design' className='selected-board-bottom' />
                        <img src={this.props.grip.image} alt='grip' className='selected-board-top' />
                        <img src={this.props.trucks.image} alt='trucks' className={`selected-trucks-top-front-${this.props.design.name}`} />
                        <img src={this.props.trucks.image} alt='trucks' className={`selected-trucks-top-back-${this.props.design.name}`} />
                        <img src={this.props.trucks.image} alt='trucks' className={`selected-trucks-bottom-front-${this.props.design.name}`} />
                        <img src={this.props.trucks.image} alt='trucks' className={`selected-trucks-bottom-back-${this.props.design.name}`} />
                        <img src={this.props.wheels.image} alt='wheels' className={`selected-wheels-top-front-${this.props.design.name}`} />
                        <img src={this.props.wheels.image} alt='wheels' className={`selected-wheels-top-back-${this.props.design.name}`} />
                        <img src={this.props.wheels.image} alt='wheels' className={`selected-wheels-bottom-front-${this.props.design.name}`} />
                        <img src={this.props.wheels.image} alt='wheels' className={`selected-wheels-bottom-back-${this.props.design.name}`} />
                      </div>)
                    }
                </div>
                <div className='custom-board-parts-div'>
                    {mappedParts}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {wheels, trucks, grip, design} = reduxState;
    return {
        wheels,
        trucks,
        grip,
        design
    }
}

const mapDispatchToProps = {
    updateWheels
}

export default connect(mapStateToProps, mapDispatchToProps)(Wheels);