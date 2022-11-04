//figure out city API
//input.val() ???
//search suggestions
//var citySearched = "input"
var myKey = "9ee067cb6c60d1cf1d72062b348c22a8"
var time = moment();
var todaysDate = time.format("MMMM Do, YYYY");
var inputEl = $("input");
var cityNameEl = $(".city-name");
var cityFiveDayEl = $("#city-name-five");
var currentTempEl = $("#current-temp");
var currentWindEl = $("#current-wind");
var currentHumidityEl = $("#current-humidity");
var todaysDateEl = $("#today");
var weatherIconEl = $("#weather-icon")


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
            for(var i = 1; i < 5; i++){
                var daysTemp = data.daily[i].temp.day;
                var daysWind = data.daily[i].wind_speed;
                var daysHumidity = data.daily[i].humidity;
                var futureDate = time.add(1, 'days').format("MMMM Do, YYYY");
                var daysIconText = data.daily[i].weather[0].icon
                var daysIconImg = "http://openweathermap.org/img/wn/"+daysIconText+"@2x.png";
                var futureWeatherEl = $(".forecast-block"+i);
                //create five day elements
                futureWeatherEl.append("<h4>"+futureDate+"</h4>");
                futureWeatherEl.append("<img src = "+daysIconImg+"></img");
                futureWeatherEl.append("<p> Temperature: "+daysTemp+" degrees</p>");
                futureWeatherEl.append("<p>Wind Speed: "+daysWind+"mph</p>");
                futureWeatherEl.append("<p>Humidity: "+daysHumidity+"%</p>");
            }



        })

//NEXT STEPS:
//1. fetch date with moment.

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



    var daysIconText = data.list[0].weather[0].icon;
    var daysIconImg = "http://openweathermap.org/img/wn/"+daysIconText+"@2x.png";
    cityNameEl.text(cityName);
    cityFiveDayEl.text(cityName+"'s Five Day Forecast")
    console.log(todaysDate)
    todaysDateEl.text(todaysDate);
    weatherIconEl.append("<img src = "+daysIconImg+"></img");
    currentTempEl.text("Temperature: "+currentTemp+" degrees"); 
    currentWindEl.text("Wind Speed: "+currentWind +"mph");
    currentHumidityEl.text("Humidity: "+currentHumidity+"%");
}