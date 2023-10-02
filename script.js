var apiKey = "875af71136649c184bc2e5c69a8a3db8"
var form = document.getElementById ("cityForm")
var cityInput = document.getElementById ("cityInput")



function currentWeatherData(cityData) {
var lon = cityData[0].lon
var lat = cityData[0].lat
var cityName = cityData[0].name
console.log(lon, lat, cityName);
var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
fetch (apiURL).then(function(response){
    return response.json()
}) .then(function(data){
    console.log(data); 
})
}

function getCoords(cityInput) {
    var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${apiKey}`
    fetch (apiURL).then(function(response){
        return response.json()
    }) .then(function(data){
        console.log(data); 
        currentWeatherData(data)
    })
}
getCoords("Chicago")
form.addEventListener("submit", function(event){
    event.preventDefault()
    console.log(cityInput.value);
    getCoords(cityInput.value)
}) 