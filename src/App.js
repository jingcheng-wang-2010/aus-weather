import React, { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'
import sydney from './SampleData/sydney.json'
import melbourne from './SampleData/melbourne.json'
import canberra from './SampleData/canberra.json'

function Cities (props) {
  return (
    <div className='results'>
      <City />
    </div>
  )
}

function City (props) {
  console.log('City: ', props)
  return (
    <div className='city'>
      <h3>{props.city?.address}</h3>
      <p>日期：{props.city?.days[1].datetime} | {props.city?.days[2].datetime} </p>
      <p>
        温度：{props.city?.days[1].tempmin}°C - {props.city?.days[1].tempmax}°C | {props.city?.days[2].tempmin}°C - {props.city?.days[2].tempmax}°C
      </p>
      <p>天气：{props.city?.days[1].conditions} | {props.city?.days[2].conditions}</p>
    </div>
  )
}

function App () {
  const wantedCities = [
    'sydney',
    "melbourne",
    "canberra",
    "brisbane",
    "adelaide",
    "perth",
    "darwin",
    'hobart'
  ]

  const [cities, setCities] = useState([])
  const myApiKey = '7SE5XMBQ3KQH9LZR3NYAR8QMJ'
  let locationString = "";
  wantedCities.map((wantedCity) => {
    locationString = locationString === "" ? `${wantedCity},au` : `${locationString}%7C${wantedCity},au`
  });
  console.log("locationString: ",locationString);


  useEffect(() => {
    console.log("Wanted cities: ", wantedCities)
    Axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timelinemulti?key=${myApiKey}&unitGroup=metric&locations=${locationString}`
    ).then(res => {
      console.log("data locations: ",res.data.locations)
      setCities(res.data.locations)
      console.log('Cities:', cities)
    })
    
  }, [])
  //console.log('City_: ', city)
  return (
    <div className='App'>
      <button> Generate</button>
      {cities?.map(city => {
        return (
          <City city={city} />
        )
      })}
    </div>
  )
}

export default App
