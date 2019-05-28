import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import PartDisplay from './PartDisplay';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import {updateDesign, updateGrip} from './../../ducks/reducer';
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

    render(){
        console.log(this.props.design)
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
                    <Link to='/board-grip'><Button bsPrefix='customize-step-btn'>2</Button></Link>
                    <Link to='/trucks'><Button bsPrefix='customize-step-btn'>3</Button></Link>
                    <Link to='/wheels'><Button bsPrefix='customize-step-btn'>4</Button></Link>
                    <Link to='/graphics'><Button bsPrefix='customize-step-btn'>5</Button></Link>
                </ButtonGroup>
                <div className='custom-board-image-div'>
                    {this.props.design.name
                        ? (<div>
                            <h5 className='custom-step-name'>{this.props.design.name} Design</h5>
                            <img src={this.props.design.image} alt='design' className={`selected-board`}/>
                          </div>)
                        :  (<div>
                                <h5 className='custom-step-name'>Select a Design</h5>
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
    const {design, grip} = reduxState
    return {
        design,
        grip
    }
}

const mapDispatchToProps = {
    updateDesign,
    updateGrip
}

export default connect(mapStateToProps, mapDispatchToProps)(Design);