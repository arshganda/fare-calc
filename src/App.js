import React from 'react';
import ReactGA from "react-ga";
import './App.css';
import LocationSearchInput from './components/LocationSearchInput.js';
import IconLabel from './components/IconLabel.js';
import OptionCard from './components/OptionCard.js';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import uber from './assets/images/Uber_Logo_Black_RGB.svg';
import lyft from './assets/images/Lyft_logo.svg';
import taxi from './assets/images/taxi.svg';
import orderACar from './assets/images/undraw_order_a_car_3tww.svg';
import comingHome from './assets/images/undraw_coming_home_52ir.svg';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.ref1 = React.createRef();
    this.ref2 = React.createRef();
    this.state = {
      origin: '',
      destination: '',
      distance: '-',
      duration: '-',
      durationSecs: '',
      distanceMeters: '',
      showOptions: false,
    }
  }

  componentDidMount = () => {
    ReactGA.initialize('UA-153222403-1');
    ReactGA.pageview('/home');
  }

  handleOriginChange = origin => {
    this.setState({ origin });
  }

  updateOrigin = async origin => {
    ReactGA.event({
      category: "Search",
      action: "Selected pick up location",
      label: origin
    });
    geocodeByAddress(origin)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log(lat + "  " + lng);
        this.setState({ originLat: lat, originLong: lng });
      });
    this.ref1.current.blur();
    this.setState({ origin });
  };

  handleDestinationChange = destination => {
    this.setState({ destination });
  }

  updateDestination = destination => {
    ReactGA.event({
      category: "Search",
      action: "Selected drop off location",
      label: destination
    });
    this.doThis(destination);
    this.ref2.current.blur();

  };


  doThis = async (destination) => {
    this.setState({ destination });
    let service = new window.google.maps.DistanceMatrixService();
    geocodeByAddress(destination)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log(lat + "  " + lng);
        this.setState({ destLat: lat, destLng: lng });
      });
    service.getDistanceMatrix({
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
      let showOptions = true;
      this.setState({ distance, distanceMeters, duration, durationSecs, showOptions });
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

  handleScroll = () => {
    // scroller.scrollTo('search', {
    //   duration: 500,
    //   delay: 25,
    //   smooth: true,
    //   offset: -16, // Scrolls to element + 50 pixels down the page
    // });
  }

  swapAddresses = () => {
    let service = new window.google.maps.DistanceMatrixService();
    // geocodeByAddress(destination)
    //   .then(results => getLatLng(results[0]))
    //   .then(({ lat, lng }) => {
    //     console.log(lat + "  " + lng);
    //     this.setState({ destLat: lat, destLng: lng });
    //   }
    //   );
    service.getDistanceMatrix({
      origins: [this.state.destination],
      destinations: [this.state.origin],
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
        trafficModel: 'bestguess'
      }
    }, function (response, status) {
      // Assuming response structure doesn't change
      let distance = response.rows[0].elements[0].distance['text'];
      let distanceMeters = response.rows[0].elements[0].distance['value'];
      let duration = response.rows[0].elements[0].duration_in_traffic['text'];
      let durationSecs = response.rows[0].elements[0].duration_in_traffic['value'];
      let showOptions = true;
      this.setState({ distance, distanceMeters, duration, durationSecs, showOptions });
    }.bind(this));
    this.setState({ destination: this.state.origin, origin: this.state.destination });
  }

  render() {

    return (
      <div className="App">
        <div className="header">
          <span id="title">FareCompare</span>
          <span id="sub">Price estimates of transit options in British Columbia</span>
        </div>
        <img src={orderACar} className="main-img"></img>

        <div className="search-container">
          <Element name="search" id="search">
            <span className="where-to" id="where">Where to?</span>
          </Element>
          <div className="search-inputs">
            <div className="search-input-col">
              <LocationSearchInput
                value={this.state.origin}
                reference={this.ref1}
                className="from"
                placeholderText="Pick Up"
                handleChange={this.handleOriginChange}
                handleSelect={this.updateOrigin.bind(this)}
                onFocus={this.handleScroll}
              />
              <LocationSearchInput
                value={this.state.destination}
                reference={this.ref2}
                className="to"
                placeholderText="Drop Off"
                handleChange={this.handleDestinationChange}
                handleSelect={this.updateDestination}
                onFocus={this.handleScroll}
              />
            </div>
            <i class="material-icons" id="swap" onClick={this.swapAddresses}>
              swap_vert
            </i>
          </div>
          <div className="dist-time">
            <IconLabel
              icon="directions_car"
              label="DISTANCE"
              value={this.state.distance}
            />
            <IconLabel
              icon="timer"
              label="DURATION"
              value={this.state.duration}
            />
          </div>
        </div>

        <div className={this.state.showOptions ? "options-container" : "options-container hidden"}>
          <div className="options-title">
            Request a Ride
          </div>
          <OptionCard
            pickupAddress={this.state.origin}
            dropoffAddress={this.state.destination}
            pickupLat={this.state.originLat}
            pickupLong={this.state.originLong}
            dropoffLat={this.state.destLat}
            dropoffLong={this.state.destLng}
            logo={uber}
            mode="uber"
            price={this.calculatePrice("uber", this.state.distanceMeters, this.state.durationSecs)}
          />
          <OptionCard
            logo={lyft}
            mode="lyft"
            price={this.calculatePrice("lyft", this.state.distanceMeters, this.state.durationSecs)} />
          <OptionCard
            logo={taxi}
            mode="taxi"
            price={this.calculatePrice("taxi", this.state.distanceMeters, this.state.durationSecs)} />
          <span className="disclaimer">*Estimates do not include current surge pricing.</span>
        </div>

        <img src={comingHome} className={this.state.showOptions ? "second-img hidden" : "second-img"}></img>

      </div >
    );
  }
}

export default App;
