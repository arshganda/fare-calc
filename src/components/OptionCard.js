import './OptionCard.css';
import React from 'react';

const OptionCard = (props) => {

    const priceBreakdown = (mode) => {
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

    const buildURL = (mode) => {
        let base = '';


        switch (mode) {
            case 'uber':
                let clientId = "oJnri9OfGiSfI9MnvbUfBce8g37hcdaf";
                let formattedAddress = encodeURIComponent(props.pickupAddress);
                let formattedDAddress = encodeURIComponent(props.dropoffAddress);

                return `https://m.uber.com/ul/?action=setPickup&client_id=${clientId}&pickup[formatted_address]=${formattedAddress}&pickup[latitude]=${props.pickupLat}&pickup[longitude]=${props.pickupLong}&dropoff[formatted_address]=${formattedDAddress}&dropoff[latitude]=${props.dropoffLat}&dropoff[longitude]=${props.dropoffLong}`;
                break;
            default:
                return "https://m.uber.com/ul/?client_id=oJnri9OfGiSfI9MnvbUfBce8g37hcdaf";
        }
    }


    let url = buildURL(props.mode);
    let uber = "https://m.uber.com/ul/?action=setPickup&client_id=oJnri9OfGiSfI9MnvbUfBce8g37hcdaf&pickup[formatted_address]=UBC%20Bookstore%2C%20University%20Boulevard%2C%20Vancouver%2C%20BC%2C%20Canada&pickup[latitude]=49.265070&pickup[longitude]=-123.250572&dropoff[formatted_address]=Vancouver%2C%20BC%2C%20Canada&dropoff[latitude]=49.282729&dropoff[longitude]=-123.120738";

    let lyft = "https://lyft.com/ride?id=lyft&pickup[latitude]=49.265070&pickup[longitude]=-123.250572&partner=G5P5HfhFrXks&destination[latitude]=49.282729&destination[longitude]=-123.120738";


    return (
        <a href={lyft} target="_blank" className="option-card">

            <img src={props.logo} height={"70px"} width={"100px"}></img>
            <div className="option-text">
                ${props.price}{(props.mode === "uber" || props.mode === "lyft") ? "*" : ""}
            </div>
            <i class="material-icons">
                chevron_right
              </i>

        </a >
    );
}


export default OptionCard;