import SearchBox from './SearchBox'
import InfoBox from './InfoBox'
import { useState } from 'react'

export default function () {
  const [WeatherInfo,setWeather] = useState({
      city: "Delhi",
      temp : 25.05,
      tempMin: 25.05,
      tempMax: 25.05,
      humidity : 47,
      feelsLike: 24.84,
      weather: "haze"
  });
  
  let updateInfo = (newInfo) =>{
    setWeather(newInfo);
  }


  return (
    <div style={{ textAlign: "center" }}>
      <h1>Weather App</h1>
      <SearchBox updateInfo = {updateInfo} />
      <br /><br />
      <InfoBox info={WeatherInfo} ></InfoBox>
    </div>

  )
} 