import React from 'react';


class OptionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    priceBreakdown = (mode) => {
        switch (mode) {
            case 'uber':
                return "$4.50 base + $0.70/km + $0.33/min";
                break;
            case 'lyft':
                return "$5.00 base + $0.65/km + $0.33/min";
                break;
            case 'taxi':
                return "$3.35 base + $1.93/km + $0.57/min stopped";
                break;
        }
    }

    render() {

        return (
            <a href="http://google.ca" target="_blank" className="option-card">

                    <img src={this.props.logo} height={"70px"} width={"100px"}></img>
                    <div className="option-text">
                        ${this.props.price}{(this.props.mode === "uber" || this.props.mode === "lyft") ? "*" : ""}
                    </div>
                    <i class="material-icons">
                        chevron_right
              </i>

            </a >
        );
    }
}

export default OptionCard;