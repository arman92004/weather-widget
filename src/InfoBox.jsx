import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import "./InfoBox.css"
export default function InfoBox({info}){
    const Hot_URL = "https://images.unsplash.com/photo-1447601932606-2b63e2e64331?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1bm55JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";
    const cold_url = "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ludGVyfGVufDB8fDB8fHww";
    const rain_url = "https://plus.unsplash.com/premium_photo-1661715276689-619fb1c79d6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFpbnxlbnwwfHwwfHx8MA%3D%3D";
    const mod_url = "https://images.unsplash.com/photo-1577256436245-8640190473bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHN1bW1lcnxlbnwwfHwwfHx8MA%3D%3D";
    return (
      <div className='InfoBox' >
        <div className='cardContainer'>
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia  className='image'
          sx={{ height: 200 , objectFit: 'contain' }}
          image={info.humidity>80?rain_url:info.temp<15?cold_url:info.temp>40?Hot_URL:mod_url}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {info.city} {info.humidity>80?<BeachAccessIcon/>:info.temp<15?<AcUnitIcon/>:info.temp>40?<DeviceThermostatIcon/>:<WbSunnyIcon/>}
          </Typography>
          <Typography variant="body2" color="text.secondary" component={"span"}>
            <p>Temperature = {info.temp}&deg;C</p>
            <p>Humidity : {info.humidity}</p>
            <p>Min Temp = {info.tempMin}&deg;C</p>
            <p>Max Temp = {info.tempMax}&deg;C</p>
            <p>
              Weather can be describes as  <i>{info.weather}</i> and feels like {info.feelsLike}&deg;C.
            </p>
          </Typography>
        </CardContent>
      </Card>
      </div>
      </div>
  
    )
}