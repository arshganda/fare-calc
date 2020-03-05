import './IconLabel.css';
import React from 'react';

class IconLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div className="dist">
                <i class="material-icons">
                    {this.props.icon}
                </i>
                <div className="dist-text">
                    <span className="label-header">{this.props.label}</span>
                    <span>{this.props.value}</span>
                </div>

            </div>
        );
    }
}

export default IconLabel;