
const API_KEY ='0fa45a081d0b7018423f896b975ceeef';
const cityName = 'Pittsburgh';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const searchBox = document.querySelector('.search-content input');
const searchBtn = document.querySelector('.search-content button');
const weatherIcon = document.querySelector('.weather-icon');


async function getWeatherData(cityName) {
    const response = await fetch(BASE_URL + `?q=${cityName}&appid=${API_KEY}`);
    const data = await response.json();
    console.log(data);

    if(data.cod === '404' || cityName === 'undefined') {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';

        return;
    }
    else{
        document.querySelector('.weather').style.display = 'flex';
        document.querySelector('.error').style.display = 'none';
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.floor(data.main.temp - 273) + '°C';
    
        let windSpeed = data.wind.speed;
        windSpeed = Math.floor(windSpeed * 3.6);
        document.querySelector('.wind').innerHTML =windSpeed + 'km/h';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';

        if(data.weather[0].main === 'Clouds') {
            weatherIcon.src = 'assets/images/clouds.png';
        }

        else if(data.weather[0].main === 'Drizzle'){
            weatherIcon.src = 'assets/images/drizzle.png.png';
        }

        else if(data.weather[0].main === 'Rain') {
            weatherIcon.src = 'assets/images/rain.png';
        }

        else if(data.weather[0].main === 'Snow') {
            weatherIcon.src = 'assets/images/snow.png';
        }
        else {
            weatherIcon.src = 'assets/images/clear.png';
        }

    }
}

searchBtn.addEventListener('click', () => {
    getWeatherData(searchBox.value);

});

searchBox.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        getWeatherData(searchBox.value);
    }
});





