import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import GripDisplay from './GripDisplay';
import {updateGrip} from './../../ducks/reducer';

class BoardSize extends Component {
    constructor(props){
        super(props);
        this.state = {
            grips: []
        }
    }

    componentDidMount(){
        this.handleGetGrips()
    }

    handleGetGrips = () => {
        axios.get('/api/board-grip')
        .then(res => {
            this.setState({
                grips: res.data
            })
        })
    }

    handleSelectedItem = (e, name, image, price) => {
        this.props.updateGrip({name: name, image: image, price: price})
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
                    <Link to='/customize'><Button bsPrefix='customize-step-btn'>1</Button></Link>
                    <Button bsPrefix='active-customize-step-btn'>2</Button>
                    <Link to='/trucks'><Button bsPrefix='customize-step-btn'>3</Button></Link>
                    <Link to='/wheels'><Button bsPrefix='customize-step-btn'>4</Button></Link>
                    <Link to='/graphics'><Button bsPrefix='customize-step-btn'>5</Button></Link>
                </ButtonGroup>
                <div className='custom-board-image-div'>
                    {this.props.grip.name
                    ?  (<div>
                          <h5 className='custom-step-name'>Select a Grip</h5>
                          <img src={this.props.design.image} alt='design' className='selected-board'/>
                          <img src={`https://s3-us-west-1.amazonaws.com/old-dog-new-trick-longboards-bucket/${this.props.design.name}_${this.props.grip.name}.png`} alt='grip' className='selected-grip'/>
                        </div>)
                    :  (<div>
                          <h5 className='custom-step-name'>Select a Grip</h5>
                          <img src={this.props.design.image} alt='design' className='selected-board'/>
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
    const {grip, design} = reduxState
    return {
        grip,
        design
    }
}

const mapDispatchToProps = {
    updateGrip
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardSize);