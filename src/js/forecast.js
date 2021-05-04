async function forecastWeather(units, city) {
  let forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=a5d5560ee39e3fe746c3741ca01c482c`, {
    mode: 'cors'
  })

  if( forecast.status === 200 ) { 

    let forecastJson = await forecast.json()    
    console.log(forecastJson.list);
    console.log(forecastJson.list[5]);
    console.log(forecastJson.list[13]);
    console.log(forecastJson.list[21]);
    console.log(forecastJson.list[29]);
    console.log(forecastJson.list[37]);
    // return [
    //   forecastJson.name, 
    //   forecastJson.sys.country, 
    //   forecastJson.main.temp, 
    //   forecastJson.weather[0].description, 
    //   forecastJson.weather[0].icon, 
    //   forecastJson.main.humidity]
    return [
      forecastJson.list[3],
      forecastJson.list[13],
      forecastJson.list[21],
      forecastJson.list[29],
      forecastJson.list[37]
    ]
  } else if (forecast.status == 404 ) {
    console.log(forecast.statusText);
    return forecast.statusText
  }
}

// forecastWeather('cusco')

export {
  forecastWeather
}