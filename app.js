const dataToday = document.querySelector('.data-today')
const nameCity = document.querySelector('.name-city')
const weatherInput = document.querySelector('.weather-input')
const warning = document.querySelector('.warning')
const btn = document.querySelector('.button-city')
const weatherImg = document.querySelector('.weather-img')
const weatherType = document.querySelector('.weather-type')
const weatherTemperature = document.querySelector('.weather-temperature')
const weatherHumidity = document.querySelector('.weather-humidity')

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q="
const API_KEY = "&appid=604016988cbf46193b48cc5befbb0708"
const API_UNITS = "&units=metric";



const data = new Date()
const day = data.getDate()
const month = data.getMonth().toString().padStart(2, '0')
const year = data.getFullYear()
dataToday.textContent = `${day} / ${month} / ${year}`




const getWeather = () => {
    const city = weatherInput.value || 'Szczecin'
    const URL = API_LINK + city + API_KEY + API_UNITS;
    
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        const temp = Math.floor(data.main.temp)
        const hum = data.main.humidity
        const cloud = Object.assign({}, ...data.weather)
        weatherType.textContent = cloud.main
        weatherTemperature.textContent = `${temp}°C`
        weatherHumidity.textContent = `${hum}%`
        nameCity.textContent = data.name
        weatherInput.value = ''
        warning.textContent = ''
        if(cloud.id >= 200 && cloud.id < 300) {
            weatherImg.src = './img/thunderstorm.png'
        } else if (cloud.id >= 300 && cloud.id < 400) {
            weatherImg.src = './img/drizzle.png'
        } else if (cloud.id >= 500 && cloud.id < 600) {
            weatherImg.src = './img/rain.png'
        } else if (cloud.id >= 600 && cloud.id < 700) {
            weatherImg.src = './img/ice.png'
        } else if (cloud.id >= 700 && cloud.id < 800) {
            weatherImg.src = './img/fog.png'
        } else if (cloud.id === 800) {
            weatherImg.src = './img/sun.png'
        } else if (cloud.id > 800 && cloud.id < 900) {
            weatherImg.src = './img/cloud.png'
        } else {
            weatherImg.src = './img/unknown.png'
        }
    })
    .catch(() => {
        warning.textContent = 'Podaj poprawną nazwę miasta !'
    })
}

btn.addEventListener('click', getWeather)
weatherInput.addEventListener('keydown', (e) => {
    if(e.code === "Enter" || e.keyCode === 13) {
        getWeather()
    }
})
getWeather()