// Variable Declaration
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

// Function Declaration
async function checkWeather(city){
    const key = "d629f26d4daf9126e77224f36b907e8f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    // Showing Error 404
    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }

    // Hiding Error 404
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`; // Displaying Temperature
    description.innerHTML = `${weather_data.weather[0].description}`;           // Displaying Description
    humidity.innerHTML = `${weather_data.main.humidity}%`;                      // Displaying Humidity
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;                    // Displaying Wind Speed

    // Checking the weather condition
    switch(weather_data.weather[0].main){
        case 'Clear':
            weather_img.src = "images/sun.gif";
            break;
        case 'Clouds':
            weather_img.src = "images/clouds.gif";
            break;
        case 'Rain':
            weather_img.src = "images/rain.gif";
            break;
        case 'Drizzle':
            weather_img.src = "images/drizzle.gif";
            break;
        case 'Snow':
            weather_img.src = "images/snow.gif";
            break;
        case 'Thunderstorm':
            weather_img.src = "images/thunderstorm.gif";
            break;
        case 'Mist':
            weather_img.src = "images/mist.gif";
            break;
        case 'Haze':
            weather_img.src = "images/mist.gif";
            break;
        case 'Fog':
            weather_img.src = "images/mist.gif";
            break;        
    }
}

// Calling checkWeather Function
searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
})

// Search through Enter Keypress
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchBtn").click();
    }
});