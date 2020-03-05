import './OptionCard.css';
import React from 'react';

const OptionCard = (props) => {

    const buildURL = (mode) => {
        let clientId = '';

        switch (mode) {
            case 'uber':
                clientId = "oJnri9OfGiSfI9MnvbUfBce8g37hcdaf";
                let formattedAddress = encodeURIComponent(props.pickupAddress);
                let formattedDAddress = encodeURIComponent(props.dropoffAddress);

                return `https://m.uber.com/ul/?action=setPickup&client_id=${clientId}&pickup[formatted_address]=${formattedAddress}&pickup[latitude]=${props.pickupLat}&pickup[longitude]=${props.pickupLong}&dropoff[formatted_address]=${formattedDAddress}&dropoff[latitude]=${props.dropoffLat}&dropoff[longitude]=${props.dropoffLong}`;
                break;
            case 'lyft':
                clientId = "G5P5HfhFrXks";

                return `https://lyft.com/ride?id=lyft&pickup[latitude]=${props.pickupLat}&pickup[longitude]=${props.pickupLong}&partner=${clientId}&destination[latitude]=${props.dropoffLat}&destination[longitude]=${props.dropoffLong}`;
                break;
            case 'taxi':
                return 'tel: +1604-681-1111';
            default:
                return '';
        }
    }

    return (
        <a href={buildURL(props.mode)} className="option-card">

            <img src={props.logo} height={"70px"} width={"100px"}></img>
            <div className="option-text">
                ${props.price}{(props.mode === "uber" || props.mode === "lyft") ? "*" : ""}
            </div>
            <i class="material-icons">
                {props.mode === 'taxi' ? 'phone' : 'launch'}
            </i>

        </a >
    );
}

export default OptionCard;