import React from 'react';
import testpicture from './../the-nigmatic-263109-unsplash.jpg';

const BoardBar = (props) => {
    return (
        <div>
            <img src={testpicture} alt='longboard' className='board-bar-image' />
            <p>{props.board.longboard_title}</p>
            <p>${props.board.price}</p>
        </div>
    )
}

export default BoardBar;