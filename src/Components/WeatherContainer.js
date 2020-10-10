import React, { useState } from 'react';
import '../Styles/Weather.css';
import WeatherInfo from './WeatherInfo';


const WeatherContainer = () => {
    const API_KEY = '[API KEY]';
    const [searchQuery, setSearchQuery] = useState("");
    const [weatherData, setWeatherData] = useState({
        temp: null,
        humidity: null,
        desc: null,
        city: null,
        icon: null
    });
    const [isValidZipCode, setIsValidZipCode] = useState(true);
    const [foundZipCode, setFoundZipCode] = useState(true);

    let updateSearch = (event) => {
        const zipCode = event.target.value
        setFoundZipCode(true);
        let isValid = validateZipCode(zipCode)
        setSearchQuery(zipCode);

        if (isValid || zipCode === "") {
            setIsValidZipCode(true);
        } else {
            setIsValidZipCode(false);
        }
    }

    const validateZipCode = (zipCode) => {
        let regex = /^\d{5}(-\d{4})?$/;
        return regex.test(zipCode);
    }

    const getWeatherData = () => {
        if (!isValidZipCode || searchQuery === "") {
            setIsValidZipCode(false);
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${searchQuery},us&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => setWeatherData({
                temp: convertToF(data.main.temp),
                humidity: data.main.humidity,
                desc: data.weather[0].description,
                city: data.name,
                icon: data.weather[0].icon
            }))
            .catch(handleError);
    }

    const handleError = (error) => {
        setFoundZipCode(false);
    }

    const convertToF = (temp) => {
        return ((temp - 273.15) * (9.0 / 5.0) + 32).toFixed(0);
    }

    const enterPressed = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is enter key
            getWeatherData();
        }
    }

    return (
        <section className="weather__container">
            <header className="container weather__header">
                <h3 className="display-4 text-center text-md-left">Weather</h3>
                <div className="weather__searchContainer">
                    <input
                        className="search__input"
                        placeholder="Zip Code"
                        onChange={updateSearch}
                        onKeyPress={enterPressed}
                    />
                    <button onClick={getWeatherData}><i class="fas fa-search"></i></button>
                </div>
            </header>
            <h3 className="text-danger text-center mt-4">{isValidZipCode ? "" : "Invalid Zip Code"}{foundZipCode ? "" : "Cannot Find Zip Code"}</h3>
            <section className="weather__info">
                {weatherData.temp === null ? (
                    <p className="lead mt-5">No Weather To Display <i class="fas fa-sun"></i></p>
                ) : <WeatherInfo data={weatherData} />
                }
            </section>
        </section>
    );
}

export default WeatherContainer;