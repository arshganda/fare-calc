import './IconLabel.css';
import React from 'react';

const IconLabel = (props) => (
    <div className="dist">
        <i class="material-icons">
            {props.icon}
        </i>
        <div className="dist-text">
            <span className="label-header">{props.label}</span>
            <span>{props.value}</span>
        </div>

    </div>
);

export default IconLabel;