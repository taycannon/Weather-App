var apiKey = "875af71136649c184bc2e5c69a8a3db8";
var form = document.getElementById("cityForm");
var cityInput = document.getElementById("cityInput");
var cityNameElement = document.querySelector(".city-name");
var weatherDescriptionElement = document.querySelector(".weather-description");
var temperatureElement = document.querySelector(".temperature");
var humidityElement = document.querySelector(".humidity");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    handleSearchInput();
    cityInput.value = '';
});

function handleSearchInput() {
    var city = cityInput.value;
    console.log(city);
    getCoords(city);
}

function getCoords(cityInput) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;

    fetch(apiURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        currentWeatherData(data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

function currentWeatherData(cityData) {
    var lon = cityData.coord.lon;
    var lat = cityData.coord.lat;
    var cityName = cityData.name;
    console.log(lon, lat, cityName);
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(apiURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        renderCurrentWeatherData(data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

function renderCurrentWeatherData(currentWeatherData) {
    var dateTimeStamp = currentWeatherData.list[0].dt;
    var temperature = currentWeatherData.list[0].main.temp;
    var humidity = currentWeatherData.list[0].main.humidity;
    var weatherDescription = currentWeatherData.list[0].weather[0].description;

    var date = new Date(dateTimeStamp * 1000);
    var formattedDate = date.toLocaleDateString();

    cityNameElement.textContent = `Weather in ${currentWeatherData.city.name}`;
    weatherDescriptionElement.textContent = `Description: ${weatherDescription}`;
    temperatureElement.textContent = `Temperature: ${temperature}°F`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
}
