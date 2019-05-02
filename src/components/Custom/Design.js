import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import './Design.css';

class Design extends Component {
    render(){
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
                    <div className='custom-parts-card'>
                        <div className='custom-part-image'>
                            This is where the part image goes
                        </div>
                        <div className='custom-part-info'>
                            This is where the part information goes
                        </div>
                    </div>
                    <div className='custom-parts-card'>
                        <div className='custom-part-image'>
                            This is where the part image goes
                        </div>
                        <div className='custom-part-info'>
                            This is where the part information goes
                        </div>
                    </div>
                    <div className='custom-parts-card'>
                        <div className='custom-part-image'>
                            This is where the part image goes
                        </div>
                        <div className='custom-part-info'>
                            This is where the part information goes
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Design;