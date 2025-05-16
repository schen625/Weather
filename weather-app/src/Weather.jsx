import {useState, useEffect} from 'react';
import './Weather.css'

const Weather = () => {
    const API_KEY = '732d92c1d00ddd545c4bad4efe241d49' 
    const [weather, setWeather] = useState(null)
    const [city, setCity] = useState('Minneapolis')
 
    //fetch weather data from an API
    const getData = async () => {
        try{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        const data = await res.json()
        console.log(data)
        setWeather(data)
    }catch (err) {
        console.log(err)
    }
    }

    //convert K to F
    const convert = (data) => {
        return ((data*9)/5) - 459.67
    }

    //on initial load, fetch based on if city changes
    useEffect(() => {
        getData()
    },[city])


    //allow users to select by their city 
    const changeCity = (e) => {
        setCity(e.target.value)
    }

    const setValue = (e) => {
        e.preventDefault()
        getData();
    }

    return (
        <div className="weather">
        <div className = "background"> 
            <form onSubmit = {setValue}>
                <label htmlFor = "city">City: </label>
                <input type = "text" id = "city" name = "city" value ={city} onChange = {changeCity}/>
            </form>
        {weather?.main && weather?.weather?.[0] ? (
            <h2>{weather.name}: {weather.weather[0].description}</h2>
        ):(<p>Loading....</p>)}
        {weather?.main && weather?.weather?.[0] ? (
            <div className="middle">
            <div className="row">
            <h1></h1>
            <p>Temperature: {convert(weather.main.temp).toFixed(1)} degrees</p>
            <p>High: {convert(weather.main.temp_max).toFixed(1)} degrees</p>
            </div>
            <div className="row">
            <p>Real Feel: {convert(weather.main.feels_like).toFixed(1)} degrees</p>
            <p>Low: {convert(weather.main.temp_min).toFixed(1)} degrees</p>
            </div>
            </div>
        ): (<p>Loading....</p>)}  
        </div>
        </div>
    )
}

export default Weather;