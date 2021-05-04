async function getWeather(units, city) {
  let currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=a5d5560ee39e3fe746c3741ca01c482c`, {
    mode: 'cors'
  })

  if( currentWeather.status === 200 ) { 

    let currentWeatherJson = await currentWeather.json()    

    return [
      currentWeatherJson.name, 
      currentWeatherJson.sys.country, 
      currentWeatherJson.main.temp, 
      currentWeatherJson.weather[0].description, 
      currentWeatherJson.weather[0].icon, 
      currentWeatherJson.main.humidity]

  } else if (currentWeather.status == 404 ) {
    console.log(currentWeather.statusText);
    return currentWeather.statusText
  }
}

export {
  getWeather
}