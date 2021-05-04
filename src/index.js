import './css/style.scss'
// import './static/weather.png'
import { getWeather } from './js/weather'
import { forecastWeather } from  './js/forecast'
// let d = new Date()
// console.log(d.getTime())
// let b = new Date(1620078781 * 1000)
// let c = new Date(1620077916472)

// console.log(d);
// console.log(b);
// let image = document.querySelector('.image')
// let str = document.querySelector('.search-string')
// let btn1 = document.querySelector('.btn1')
// btn1.addEventListener('click', getInfo)

// async function f() { 
//   let forecastWeather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=cusco&appid=a5d5560ee39e3fe746c3741ca01c482c`, {
//     mode: 'cors'
//   })
//   console.log(forecastWeather);
//   let currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=cusco&appid=a5d5560ee39e3fe746c3741ca01c482c`)
//   let currentWeatherJson = await currentWeather.json()
//   console.log(currentWeatherJson);
// }


// async function getInfo() {
//   let v = str.value ? str.value : 'dog';
  
//   let gif = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=eV6eFDqCpNshpe0Rs65AKQkIOu9BKPO0&s=${v}`, {
//     mode: 'cors'
//   })
  
//   let gifResponse = await gif.json()
  
  
//   console.log(gifResponse.data.images.original.url);
//   image.src = gifResponse.data.images.original.url
// }

// f()
// getInfo()


let city = document.querySelector('.city')
let btn = document.querySelector('.weather-btn')
let alert = document.querySelector('.alert')
let temp = document.querySelector('.temp')
let unit = document.querySelector('.unit')
let icon = document.querySelector('.icon')
let location = document.querySelector('.location')
let description = document.querySelector('.description')
let table = document.querySelector('table')
let units = document.querySelector('.units')
let cent = `&#x2103`
let far = `&#x2109`
btn.addEventListener('click', showResponse)
units.addEventListener('click', updateUnits)

units.querySelector('.c').classList.add('active');

function updateUnits() {
  if(units.classList.contains('farenheit')) {
    unit.innerHTML = cent
    convertUnits('celcius')
  } else {
    unit.innerHTML = far
    convertUnits('farenheit')
  }
  units.querySelector('.c').classList.toggle('active');
  units.querySelector('.f').classList.toggle('active');
  units.classList.toggle('farenheit')
}

async function showResponse() {
  let cityValue = city.value ? city.value : '';
  let unitValue = units.classList.contains('farenheit') ? 'imperial' : 'metric';
  if(cityValue === '') {
    alert.textContent = 'enter a city'
    alert.style.display = 'block'
  } else {
    let info = await getWeather(unitValue, cityValue)
    if (info === 'Not Found') {
      alert.textContent = 'city not found'
      alert.style.display = 'block'
    } else {
      alert.style.display = 'none'
      temp.textContent = info[2]
      icon.src = `http://openweathermap.org/img/wn/${info[4]}.png`
      location.textContent = `${info[0]}, ${info[1]}`
      unit.innerHTML = unitValue === 'metric' ? cent : far;
      description.textContent = `${info[3]}`
      let forecastInfo = await forecastWeather(unitValue, cityValue)
      console.log(forecastInfo);
      popullateTable(forecastInfo)
    }
    console.log(info);
  }
}

function popullateTable(info) {
  cleanTable()
  info.forEach(item => {
    let row = makeRow([
      item.dt_txt.slice(5,10), 
      item.main.temp, 
      item.weather[0].icon,
      item.weather[0].description,
    ])
    table.appendChild(row)
  })
}

function makeRow(weatherInfo) {
  let row = document.createElement('tr')
  for (let i = 0; i < 4; i++) {
    let data = document.createElement('td')
    if(i !== 2) {
      data.textContent = weatherInfo[i]
    } else {
      data = document.createElement('img')
      data.src = `http://openweathermap.org/img/wn/${weatherInfo[2]}.png`
    }

    if ( i === 1 ) {
      data.classList.add('var')
    }

    row.classList.add('data-row')
    row.appendChild(data)
  }
  return row
}

async function cleanTable() {
  console.log(table);
  let rows = await table.querySelectorAll('.data-row')
  console.log(rows);
  rows.forEach(async element => {
    await table.removeChild(element)
  });
}

function convertUnits(to) {
  let allVar = [...document.querySelectorAll('.var')] 
  if (to == 'celcius') {
    allVar.forEach(item => {
      item.textContent  = ((+item.textContent - 32) / 1.8).toFixed(2)
    })    
  } else {
    allVar.forEach(item => {
      item.textContent  = (1.8 * +item.textContent + 32).toFixed(2)
    })
  }
}