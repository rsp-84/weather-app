import React from 'react';
import '../Styles/Weather.css';


const WeatherInfo = (props) => {
    const { temp, humidity, desc, city, icon } = props.data;

    return (
        <React.Fragment>
            <h3 className="mt-5">{desc}<img src={`http://openweathermap.org/img/wn/${icon}.png`} /></h3>
            <section className="weather__data--flex">
                <div className="weather__info--header">
                    <h4 class="lead">City</h4>
                    <h3>{city}</h3>
                </div>
                <div className="weather__info--header">
                    <h4 class="lead">Temperature</h4>
                    <h3><span className="degree__symbol">{temp}</span> F</h3>
                </div>
                <div className="weather__info--header">
                    <h4 class="lead">Humidity</h4>
                    <h3>{humidity}%</h3>
                </div>
            </section>
        </React.Fragment>

    );
}

export default WeatherInfo;
