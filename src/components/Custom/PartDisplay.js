import React from 'react';

const PartDisplay = (props) => {
    return (
        <div className='custom-parts-card' onClick={(e) => props.selectPart(e, props.part.part_name, props.part.part_image, props.part.price)}>
            <div>
                <img src={props.part.part_image} alt='Longboard Part' className='custom-part-image'/>
            </div>
            <div className='custom-part-info'>
                <p>{props.part.part_name}</p>
            </div>
        </div>
    )
}

export default PartDisplay;