//figure out city API
//input.val() ???
//search suggestions
//var citySearched = "input"
var myKey = "9ee067cb6c60d1cf1d72062b348c22a8"
var inputEl = $("input");
var cityNameEl = $("#city-name");
var currentTempEl = $("#current-temp");
var currentWindEl = $("#current-wind");
var currentHumidityEl = $("#current-humidity");

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
            findFiveDay(data);
        })
}



function findFiveDay(data){
    var data = data;
    var latVal = data.city.coord.lat;
    var lonVal = data.city.coord.lon;
    var fiveDayURL = "https://api.openweathermap.org/data/3.0/onecall?lat="+latVal+"&lon="+lonVal+"&appid="+myKey+"&units=imperial";
    //"https://api.openweathermap.org/data/2.5/forecast?lat="+latVal+"&lon="+lonVal+"&appid="+myKey+"&units=imperial";
    printFiveDayWeather(latVal,lonVal,data,fiveDayURL)
    
}

function printFiveDayWeather(latVal,lonVal,data,fiveDayURL){
    fetch(fiveDayURL)
        .then(function(response) {
        console.log(response);
        if (response.status === 200) {
            console.log("OK!");
        }
        return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
//BLOCKER - can't figure out time api.  current weather vs future.
//NEED A FOR LOOP ONCE TIME IS FIGURED OUT
//Meantime figure out how to fetch img.  
//
}
























function printCurrentWeather(data){
//connect to moment for date???? 
//add date
//hide elements till function is run?
//add degree symbol bootstrap icon? 
    var currentTemp = data.list[0].main.temp;
    var cityName = data.city.name;
    var currentWind = data.list[0].wind.speed;
    var currentHumidity = data.list[0].main.humidity;
    cityNameEl.text(cityName);
    currentTempEl.text("Temperature: "+currentTemp); 
    currentWindEl.text("Wind: "+currentWind +"mph");
    currentHumidityEl.text("Humidity: "+currentHumidity+"%");
}
