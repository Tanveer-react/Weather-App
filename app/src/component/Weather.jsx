import React , {useEffect, useRef, useState} from 'react'
import "./Weather.css"
import Searchicon from "../assets/search.png"
import clear from "../assets/sun.png"  
import humidaty from "../assets/cloud.png"  
import  wind from "../assets/clean-energy.png"  
const Weather= () => {
  const[waetherdata,setweatherdata]=useState(false)
  const allicon={
"01d":clear,
"02d":humidaty,
"03d":wind,

  }
const inputref=useRef();
  const search = async (city) => {
    if(city=== ""){
      alert("Enter your city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const res = await fetch(url);
      const data = await res.json();
      if(!res.ok){
        alert(data.message);
        return;
      }
      console.log(data);
const icon=allicon[data.weather[0].icon] ||clear
      setweatherdata({
        humidaty:data.main.humidity,
        wind:data.wind.speed,
        temprature:Math.floor(data.main.temp),
        location:data.name,
       icon:icon,
      })
    } catch (error) {
      setweatherdata(false);
      console.log("Error fetching weather:", error);
    }
  };
  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className='weather'>
     <div className='search-bar'>
        <input type="text"placeholder='search' ref={inputref} />
        <img src={Searchicon} alt="" onClick={()=>search(inputref.current.value)} />
     </div>
     {waetherdata?<>
     <img src={waetherdata.icon} alt="" className='sun' />
     <p className='temprature'>{waetherdata.temprature} ℃</p>
     <p className='city'>{waetherdata.location}</p>
     <div className="data">
        <div className="col">
            <img src={humidaty} alt="" />
        <div>
            <p>{waetherdata.humidaty}</p>
            <span>Humidaty </span>
        </div>
        </div>
         <div className="col">
            <img src={wind} alt="" />
        <div>
            <p>{waetherdata.wind}</p>
            <span>Wind speed </span>
        </div>
        </div>
     </div>
     </>:<></>}
    </div>

  )
}

export default Weather
