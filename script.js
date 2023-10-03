var apiKey = "875af71136649c184bc2e5c69a8a3db8";
var cityForm = document.getElementById("cityForm");
var cityInput = document.getElementById("cityInput");
var cityButtons = document.querySelectorAll(".city-button");
var cityNameElement = document.querySelector(".city-name");
var weatherDescriptionElement = document.querySelector(".weather-description");
var temperatureElement = document.querySelector(".temperature");
var humidityElement = document.querySelector(".humidity");
var forecastContainer = document.querySelector(".forecast-container");

cityForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var city = cityInput.value;
    getWeatherData(city);
});

cityButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        var city = this.getAttribute("data-city");
        getWeatherData(city);
    });
});

function getWeatherData(city) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            renderCurrentWeatherData(data);
            getForecastData(data.coord.lat, data.coord.lon);
        })
        .catch(function (error) {
            console.log(error);
            clearWeatherData();
        });
}

function getForecastData(lat, lon) {
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            renderForecastData(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function renderCurrentWeatherData(weatherData) {
    cityNameElement.textContent = `Weather in ${weatherData.name}`;
    weatherDescriptionElement.textContent = `Description: ${weatherData.weather[0].description}`;
    temperatureElement.textContent = `Temperature: ${weatherData.main.temp}°C`;
    humidityElement.textContent = `Humidity: ${weatherData.main.humidity}%`;
}

function renderForecastData(forecastData) {
    forecastContainer.innerHTML = '';
    var today = new Date().toISOString().split('T')[0];
    var dailyForecasts = {};
    forecastData.list.forEach(function (forecast) {
        var forecastDate = forecast.dt_txt.split(' ')[0];
        var temperature = forecast.main.temp;
        if (forecastDate >= today && forecastDate <= calculateFutureDate(today, 5)) {
            if (dailyForecasts[forecastDate]) {
                dailyForecasts[forecastDate].totalTemp += temperature;
                dailyForecasts[forecastDate].count++;
            } else {
                dailyForecasts[forecastDate] = {
                    totalTemp: temperature,
                    count: 1
                };
            }
        }
    });
    for (var date in dailyForecasts) {
        var averageTemp = Math.round(dailyForecasts[date].totalTemp / dailyForecasts[date].count);
        var forecastItem = document.createElement("div");
        forecastItem.textContent = `Date: ${date}, Average Temperature: ${averageTemp}°F`;
        forecastContainer.appendChild(forecastItem);
    }
}


function calculateFutureDate(startingDate, daysToAdd) {
    var futureDate = new Date(startingDate);
    futureDate.setDate(futureDate.getDate() + daysToAdd);
    return futureDate.toISOString().split('T')[0];
}


function clearWeatherData() {
    cityNameElement.textContent = '';
    weatherDescriptionElement.textContent = '';
    temperatureElement.textContent = '';
    humidityElement.textContent = '';
    forecastContainer.innerHTML = '';
}
