import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import testpicture from './../Landing/placeholder.jpg';
import './Boards.css';

class Boards extends Component {
    render(){
        return(
            <div className='Boards'>
                <ButtonGroup>
                    <div className='Filterby'>
                        Filter by:
                    </div>
                    <DropdownButton title='Design' bsPrefix='Filter-dropdownbutton'>
                            <Dropdown.Item>Option 1</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>Option 2</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton alignRight title='Size' bsPrefix='Filter-dropdownbutton'>
                        <Dropdown.Item>Option 1</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Option 2</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton alignRight title='Price' bsPrefix='Filter-dropdownbutton'>
                        <Dropdown.Item>Option 1</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Option 2</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
                <div className='boardsflex'>
                    <Card bsPrefix='custom-card'>
                        <Card.Img variant="top" src={testpicture} style={{height: '165px', borderRadius: '10px 10px 0px 0px'}} />
                        <Card.Body>
                            <Card.Title>Board Title, Board Price</Card.Title>
                            <Card.Text>
                                Brief description of the longboard and it's specs go here goes here.
                            </Card.Text>
                            <ButtonGroup bsPrefix='card-btn-group'>
                                <Link to='/board/:boardname'><Button bsPrefix='boards-custom-btn1'>More Info</Button></Link>
                                <Button bsPrefix='boards-custom-btn2'>Add to Cart</Button>
                            </ButtonGroup>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Boards;