import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PartDisplay from './PartDisplay';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import './Design.css';

class Design extends Component {
    constructor(props){
        super(props);
        this.state = {
            designs: [],
            selectedDesignName: '',
            boardSize: ''
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

    render(){
        const mappedParts = this.state.designs.map((design, i) => {
            return(
                <PartDisplay 
                    key = {i}
                    part = {design} />
            )
        })
        return (
            <div className='Design'>
                <ButtonGroup>
                    <div className='customize-step-prompt'>
                        Step:
                    </div>
                    <Button bsPrefix='active-customize-step-btn'>1</Button>
                    <Link to='/boardsize'><Button bsPrefix='customize-step-btn'>2</Button></Link>
                    <Link to='/trucks'><Button bsPrefix='customize-step-btn'>3</Button></Link>
                    <Link to='/wheels'><Button bsPrefix='customize-step-btn'>4</Button></Link>
                    <Link to='/graphics'><Button bsPrefix='customize-step-btn'>5</Button></Link>
                </ButtonGroup>
                <div className='custom-board-image-div'>
                    <h5 className='custom-step-name'>Design</h5>
                </div>
                <div className='custom-board-parts-div'>
                    {mappedParts}
                </div>
            </div>
        )
    }
}

export default Design;