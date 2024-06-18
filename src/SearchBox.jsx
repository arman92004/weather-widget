import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState, useEffect } from 'react';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    let API_URL = "https://api.openweathermap.org/data/2.5/weather";
    let API_KEY = "293c4cbd5b831e3b04f92f7f4934901c";
    let GEO_API_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

    let getWeatherInfo = async (cityName) => {
        try {
            let response = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            let result = {
                city: cityName,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description
            };
            console.log(result);
            return result;
        } catch (err) {
            throw err;
        }
    }

    let getCityNameFromCoordinates = async (lat, lon) => {
        try {
            let response = await fetch(`${GEO_API_URL}?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            let jsonResponse = await response.json();
            return jsonResponse.city;
        } catch (err) {
            throw err;
        }
    }

    let handleChange = (event) => {
        console.log(event.target.value);
        setCity(event.target.value);
    };

    let handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo(city);
            updateInfo(newInfo);
        } catch (err) {
            setError(true);
        }
    }

    useEffect(() => { // to initialize the constents with current city data
        // Get user's current location and fetch weather data for that location
        const fetchWeatherForCurrentLocation = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        let cityName = await getCityNameFromCoordinates(latitude, longitude);
                        let initialInfo = await getWeatherInfo(cityName);
                        updateInfo(initialInfo);
                    } catch (err) {
                        setError(true);
                    }
                }, (error) => {
                    console.error(error);
                    setError(true);
                });
            } else {
                setError(true);
            }
        };

        fetchWeatherForCurrentLocation();
    }, []); 

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <TextField id="city" onChange={handleChange} value={city} label="City Name" variant="outlined" />
                <br /><br /><Button type="submit" variant="contained">Search</Button>
            </form>
            {error && <h3 style={{ color: "red" }}>Oops... this city doesn't exist in our API</h3>}
        </div>
    )
}
