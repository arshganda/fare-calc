import React from 'react';
import './App.css';
import LocationSearchInput from './LocationSearchInput.js';
import uber from './uber.png';
import lyft from './lyft.png';
import taxi from './taxi.png';
import orderACar from './undraw_order_a_car_3tww.svg';
import comingHome from './undraw_coming_home_52ir.svg';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import SearchResultItem from './SearchResultItem';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      origin: '',
      destination: '',
    }
  }

  async doThis() {
    let service = new window.google.maps.DistanceMatrixService();
    let response = await service.getDistanceMatrix({
      origins: [],
      destinations: [],
      travelMode: 'DRIVING',
    });
  }

  render() {
    return (
      <div className="App">
        <div className="content-wrapper">
          <header className="App-header">
            <h2>Fare Calculator</h2>
          </header>
          <SearchResultItem text={{ mainText: "123 Abc Street", secondaryText: "Abbotsford, BC, Canada" }} />
          <img src={orderACar} height={"50%"} width={"80%"}></img>

          <div className="search-container">
            <Element name="one" className="one"><h4 id="#one">Where to?</h4></Element>
            <div className="from">
              <LocationSearchInput placeholderText="Pick Up" />
            </div>

            <div className="to">
              <LocationSearchInput placeholderText="Drop Off" />
            </div>
          </div>

          <img src={comingHome} height={"50%"} width={"80%"}></img>



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
