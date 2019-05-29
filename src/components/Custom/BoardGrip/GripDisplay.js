import React from 'react';
import {connect} from 'react-redux';

const GripDisplay = (props) => {
    return (
        <div className='custom-parts-card' onClick={(e) => props.selectPart(e, props.part.part_name, `https://s3-us-west-1.amazonaws.com/old-dog-new-trick-longboards-bucket/${props.design.name}_${props.part.part_name}.png`, props.part.price, props.part.id)}>
            <div>
                <img src={`https://s3-us-west-1.amazonaws.com/old-dog-new-trick-longboards-bucket/${props.design.name}_${props.part.part_name}.png`} alt='Longboard Part' className='custom-part-image'/>
            </div>
            <div className='custom-part-info'>
                <p>{props.part.part_name}</p>
            </div>
        </div>
    )
}

const mapStateToProps = reduxState => {
    const {design} = reduxState;
    return {
        design
    }
}

export default connect(mapStateToProps, null)(GripDisplay);