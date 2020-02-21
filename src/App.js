import React from 'react';
import './App.css';
import LocationSearchInput from './LocationSearchInput.js';
import OptionCard from './OptionCard.js';
import {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import uber from './Uber_Logo_Black_RGB.svg';
import lyft from './Lyft logo – pink – rgb.svg';
import taxi from './taxi.svg';
import orderACar from './undraw_order_a_car_3tww.svg';
import comingHome from './undraw_coming_home_52ir.svg';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      origin: '',
      destination: '',
      distance: '-',
      duration: '-',
      durationSecs: '',
      distanceMeters: '',
    }
  }

  handleOriginChange = origin => {
    this.setState({ origin });
  }

  updateOrigin = origin => {
    this.setState({ origin });
  };

  handleDestinationChange = destination => {
    this.setState({ destination });
  }

  updateDestination = destination => {
    this.doThis(destination);
  };


  doThis = async (destination) => {
    let service = new window.google.maps.DistanceMatrixService();
    let response = await service.getDistanceMatrix({
      origins: [this.state.origin],
      destinations: [destination],
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
        trafficModel: 'bestguess'
      }
    }, function (response, status) {
      let distance = response.rows[0].elements[0].distance['text'];
      let distanceMeters = response.rows[0].elements[0].distance['value'];
      let duration = response.rows[0].elements[0].duration_in_traffic['text'];
      let durationSecs = response.rows[0].elements[0].duration_in_traffic['value'];
      this.setState({ destination, distance, distanceMeters, duration, durationSecs });
    }.bind(this));
  }

  calculatePrice = (mode, distance, duration) => {
    let lyft = {
      initial: 2.5,
      service: 2.5,
      minute: 0.33,
      kilometer: 0.65,
      minFare: 5.0,
      maxFare: 400,
      cancellation: 5.0,
    };

    let uber = {
      initial: 2.5,
      service: 2.0,
      minute: 0.33,
      kilometer: 0.70,
      minFare: 6.0,
      maxFare: '',
      cancellation: 5.0,
    }

    let taxi = {
      flag: 3.35,
      kilometer: 1.93,
      minute: 0.57
    }

    let price;
    switch (mode) {
      case 'uber':
        price = distance / 1000 * uber.kilometer + duration / 60 * uber.minute + uber.initial + uber.service;
        return price > uber.minFare ? price.toFixed(2) : uber.minFare.toFixed(2);
        break;
      case 'lyft':
        price = distance / 1000 * lyft.kilometer + duration / 60 * lyft.minute + lyft.initial + lyft.service;
        return price > lyft.minFare ? price.toFixed(2) : lyft.minFare.toFixed(2);
        break;
      case 'taxi':
        price = taxi.flag + distance / 1000 * taxi.kilometer + duration / 60 * .15 * taxi.minute
        return price.toFixed(2);
        break;
    }
  }

  render() {

    return (
      <div className="App">
        <div className="content-wrapper">
          <header className="App-header">
            <h2>Fare Calculator</h2>
          </header>
          <img src={orderACar} height={"50%"} width={"85%"}></img>

          <div className="search-container">
            <span className="where-to">Where to?</span>
            <LocationSearchInput
              value={this.state.origin}
              className="from"
              placeholderText="Pick Up"
              handleChange={this.handleOriginChange}
              handleSelect={this.updateOrigin}
            />
            <LocationSearchInput
              value={this.state.destination}
              className="to"
              placeholderText="Drop Off"
              handleChange={this.handleDestinationChange}
              handleSelect={this.updateDestination}
            />
          </div>

          <div className="dist-time">
            <div className="dist">
              <i class="material-icons">
                directions_car
              </i>
              <div className="dist-text">
                <span className="label-header">DISTANCE</span>
                <span>{this.state.distance}</span>
              </div>

            </div>
            <div className="dist">
              <i class="material-icons">
                timer
              </i>
              <div className="dist-text">
                <span className="label-header">DURATION</span>
                <span>{this.state.duration}</span>
              </div>
            </div>
          </div>

          <div className="options-container">
            <span className="where-to">Your Options</span>
            <OptionCard
              logo={uber}
              mode="uber"
              price={this.calculatePrice("uber", this.state.distanceMeters, this.state.durationSecs)} />
            <OptionCard
              logo={lyft}
              mode="lyft"
              price={this.calculatePrice("lyft", this.state.distanceMeters, this.state.durationSecs)} />
            <OptionCard
              logo={taxi}
              mode="taxi"
              price={this.calculatePrice("taxi", this.state.distanceMeters, this.state.durationSecs)} />
          </div>

          <img src={comingHome} height={"50%"} width={"85%"}></img>



          {/* <div className="card">
            <div className="card-content">
              <img src={uber} alt="Uber" className="uber-logo"></img>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <img src={lyft} alt="Lyft" className="lyft-logo"></img>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <img src={taxi} alt="Taxi" className="taxi-logo"></img>
            </div>
          </div> */}


        </div>
      </div >
    );
  }
}

export default App;
