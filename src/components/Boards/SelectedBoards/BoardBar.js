import React from 'react';
// import {Link} from 'react-router-dom';
import testpicture from './../the-nigmatic-263109-unsplash.jpg';

const BoardBar = (props) => {
    return (
        // <Link to={`/board/${props.board.longboard_title}`}>
            <div>
                <img src={testpicture} alt='longboard' className='board-bar-image' />
                <p>{props.board.longboard_title}</p>
                <p>${props.board.price}</p>
            </div>
        // </Link>
    )
}

export default BoardBar;