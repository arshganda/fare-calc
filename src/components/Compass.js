import './Compass.css';
import React from 'react';

const Compass = (props) => {

    return (
        <div className="compass" >
            <i class="material-icons" onClick={props.onClick}>
                my_location
            </i>
        </div>
    );
};

export default Compass;