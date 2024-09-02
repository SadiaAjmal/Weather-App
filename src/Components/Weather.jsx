import React, { useEffect ,useState, useRef } from 'react'
import { FaSearch } from "react-icons/fa";
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'


const Weather = () => {

    const inputRef = useRef();
    const [weatherData , setWeatherData] = useState(false);
    
    const searchWeather = async (city) =>{

        if(city ===" "){
            alert("Enter City Name");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }

            const iconCode= data.weather[0].icon;
            const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
            const iconDescription= data.weather[0].description;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon:iconURL,
                iconDescription:iconDescription, 
            });

            
        } catch (error) { 
            setWeatherData(false);
            console.error('Error fetching weather data:', error);
        }
    }

    useEffect(()=>{
        searchWeather("Multan");
    },[])


  return (
    <div className=" bg-custom-gradient text-white h-auto box-border rounded-lg p-10 space-y-5 shadow-lg shadow-black/10 self-center mx-10">
        <div className=' flex items-center justify-between gap-3'>
            <input ref={inputRef} type="text" placeholder='Search' className=' w-full text-gray-900 h-10 px-3 py-1 border-none text-[20px] tracking-wider rounded-full bg-[#e8e5e5]  bg-gradient-to-r from-white via-[#fcfcfc10] to-white bg-[length:200%_200%] animate-[input_4s_infinite] outline-none' />
            <FaSearch onClick={()=> searchWeather(inputRef.current.value)} className=' text-black bg-white w-10 h-9 rounded-full px-2.5'/>
        </div>
        <div className=' flex flex-col items-center justify-center'>
            <div className=' flex flex-col items-center mb-5'>
                <img src={weatherData.icon} alt="Weather Condition Icon" className=' w-40' />
                <p>{weatherData.iconDescription}</p>            
            </div>


            <p className=' text-5xl'>{weatherData.temperature}°C</p>
            <p className=' text-3xl'>{weatherData.location}</p>
        </div>

        <div className='flex md:flex-row flex-col space-y-5 justify-between items-center mt-20'>

            <div className=' flex items-center gap-2'>
                <img src={humidity} alt="humidity icon" className=' h-6 md:h-8'/>
                    <div>
                        <p className=' text-xl font-semibold'>{weatherData.humidity}%</p>
                        <p>Humidity</p>
                    </div>
            </div>

            <div className=' flex items-center gap-2'>
                <img src={wind} alt="wind icon" className='h-6 md:h-8'/>
                    <div>
                        <p className=' text-xl font-semibold'>{weatherData.windSpeed } km/h</p>
                        <p>Wind Speed</p>
                    </div>
            </div>

        </div>
    </div>
  )
}

export default Weather; 





