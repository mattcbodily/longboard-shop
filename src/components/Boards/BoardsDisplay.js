import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class BoardsDisplay extends Component {
    handleAddToCart = () => {
        this.props.addToCart(this.props.board.longboard_id, this.props.board.price);
    }
    render(){
        return (
             <Card bsPrefix='custom-card'>
                <Card.Img variant="top" src={this.props.board.longboard_picture} style={{height: '165px', borderRadius: '10px 10px 0px 0px'}} />
                <Card.Body>
                    <Card.Title>{this.props.board.longboard_title}, ${this.props.board.price}</Card.Title>
                    <Card.Text>
                        {this.props.board.longboard_description}
                    </Card.Text>
                    <ButtonGroup bsPrefix='card-btn-group'>
                        <Link to={`/board/${this.props.board.longboard_title}`}><Button bsPrefix='boards-custom-btn1'>More Info</Button></Link>
                        <Button bsPrefix='boards-custom-btn2' onClick={this.handleAddToCart}>Add to Cart</Button>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        )
    }
}

export default BoardsDisplay;