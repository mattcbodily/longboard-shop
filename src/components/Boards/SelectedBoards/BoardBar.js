import React from 'react';
import {Link} from 'react-router-dom';

const BoardBar = (props) => {
    return (
        <Link to={`/board/${props.board.longboard_title}`} className='bar-links'>
            <div onClick={(e) => props.getBoard(e, props.board.longboard_title)} className='board-bar-div'>
                <img src={props.board.longboard_picture} alt='longboard' className='board-bar-image' />
                <p className='board-bar-info'>{props.board.longboard_title}</p>
                <p className='board-bar-info'>${props.board.price}</p>
            </div>
        </Link>
    )
}

export default BoardBar;