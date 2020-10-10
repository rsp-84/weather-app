import React from 'react';
import '../Styles/App.css'
import WeatherContainer from './WeatherContainer';
import "bootstrap/dist/css/bootstrap.css";


function App() {
  return (
    <div className="App">
        <section className="app__container">
            <WeatherContainer />
        </section>
    </div>
  );
}

export default App;