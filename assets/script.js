//figure out city API
//input.val() ???
//search suggestions
//var citySearched = "input"
var myKey = "9ee067cb6c60d1cf1d72062b348c22a8"
var inputEl = $("input");

$("button").on("click", function(event){
    event.preventDefault();
    var citySearched = inputEl.val();
    verifyCityEntered(citySearched);
})

function verifyCityEntered(citySearched){
    var citySearchedURL = "https://api.openweathermap.org/data/2.5/forecast?q="+citySearched+"&appid="+myKey+"&units=imperial";
    console.log(citySearchedURL)
    fetch(citySearchedURL)
        .then(function(response) {
        console.log(response);
        if (response.status === 200) {
            console.log("OK!");
        }
        else{
            alert("Please enter a valid city name.")
        }
        return response.json();
        })
        .then(function (data) {
            console.log(data);
            printCurrentWeather(data);
            //findFiveDay(data);
        })
}


function findFiveDay(data){
    var latVal = data.city.coord.lat;
    var lonVal = data.city.coord.lon;
    console.log(latVal);
    console.log(lonVal);
//var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+latVal+"&lon="+lonVal+"&appid="+myKey

}

function printCurrentWeather(data){
//var currentWeatherEl = $("#currentWeather");
var currentTemp = data.list[0].main.temp;
var cityName = data.city.name;
var currentWind = data.list[0].wind.speed;
var currentHumidity = data.list[0].main.humidity;
console.log("temp:"+currentTemp);
console.log("city: "+cityName);
console.log("wind: " + currentWind);
console.log("humidity: " + currentHumidity);


// 
}
