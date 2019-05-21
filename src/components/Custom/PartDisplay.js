import React from 'react';

const PartDisplay = (props) => {
    return (
        <div className='custom-parts-card'>
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