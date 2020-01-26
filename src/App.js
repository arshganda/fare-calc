import React from 'react';
import './App.css';
import LocationSearchInput from './LocationSearchInput.js';

function App() {

  return (
    <div className="App">
      <div className="content-wrapper">
        <header className="App-header">
          <h2>Fare Calculator</h2>
        </header>

        From: <LocationSearchInput />
        To: <LocationSearchInput />


      </div>
    </div>
  );
}

export default App;
