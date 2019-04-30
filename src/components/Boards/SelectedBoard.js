import React, {Component} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

class SelectedBoard extends Component {
    render(){
        return(
            <div className='Boards'>
                <Carousel interval='5000'>
                    <Carousel.Item>
                        <div className='Carouselimage'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='Carouselimage'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='Carouselimage'/>
                    </Carousel.Item>
                </Carousel>
                <ButtonGroup bsPrefix='custom-btn-group'>
                    <Button></Button>
                    <Button bsPrefix='selected-board-btn'>Add to Cart</Button>
                    <Button bsPrefix='selected-board-btn'>Customize</Button>
                </ButtonGroup>
            </div>
        )
    }
}

export default SelectedBoard;