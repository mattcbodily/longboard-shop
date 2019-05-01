import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

class Pictures extends Component {
    render(){
        return (
            <div className='Design'>
                <ButtonGroup>
                    <div className='customize-step-prompt'>
                        Step:
                    </div>
                    <Link to='/customize'><Button bsPrefix='customize-step-btn'>1</Button></Link>
                    <Link to='/boardsize'><Button bsPrefix='customize-step-btn'>2</Button></Link>
                    <Link to='/trucks'><Button bsPrefix='customize-step-btn'>3</Button></Link>
                    <Link to='/wheels'><Button bsPrefix='customize-step-btn'>4</Button></Link>
                    <Button bsPrefix='active-customize-step-btn'>5</Button>
                </ButtonGroup>
                <div className='custom-board-image-div'>
                    <h5 className='custom-step-name'>Graphics</h5>
                </div>
            </div>
        )
    }
}

export default Pictures;