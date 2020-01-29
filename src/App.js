import React from 'react';
import './App.css';
import LocationSearchInput from './LocationSearchInput.js';
import uber from './uber.png';
import lyft from './lyft.png';
import taxi from './taxi.png';

function App() {

  return (
    <div className="App">
      <div className="content-wrapper">
        <header className="App-header">
          <h2>Fare Calculator</h2>
        </header>

        <div className="from">
          From: <LocationSearchInput />
        </div>
        <div className="to">
          To: <LocationSearchInput />
        </div>


        <div className="card">
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
        </div>


      </div>
    </div>
  );
}

export default App;
