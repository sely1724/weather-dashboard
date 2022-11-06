var myKey = "9ee067cb6c60d1cf1d72062b348c22a8"
var time = moment();
var todaysDate = time.format("MMMM Do, YYYY");
var inputEl = $("input");
var cityNameEl = $(".city-name");
var cityFiveDayEl = $("#city-name-five");
var historySectionEl = $("#history-section")
var savedCityEl = $("#list-city-searches");
var currentTempEl = $("#current-temp");
var currentWindEl = $("#current-wind");
var currentHumidityEl = $("#current-humidity");
var todaysDateEl = $("#today");
var currWeatherPrintEl = $(".curr-weather-col");
var futureWeatherPrintEl = $(".future-forecast-col");
var weatherIconEl = $("#weather-icon");
var searchHistory = JSON.parse(localStorage.getItem("search-history"))||[];


init();

function init(){
if (searchHistory == null) {
    return;
}
else {
    initialPrintCitySearched();
}



}

$("#search-button").on("click", function(event){
    event.preventDefault();
    var citySearched = inputEl.val();
    verifyCityEntered(citySearched);
})

$(savedCityEl).on("click", function(event){
    event.preventDefault();
    var cityChosen = $(event.target).text();
    verifyCityEntered(cityChosen);
})


function verifyCityEntered(citySearched){
    var citySearchedURL = "https://api.openweathermap.org/data/2.5/forecast?q="+citySearched+"&appid="+myKey+"&units=imperial";
    console.log(citySearchedURL)
    fetch(citySearchedURL)
        .then(function(response) {
        console.log(response);
        if (response.status === 200) {
            console.log("OK!");
            storeCitySearched(citySearched);
        }
        else{
            alert("Please enter a valid city name.")
        }
        return response.json();
        })
        .then(function (data) {
            printCurrentWeather(data);
            findFiveDay(data);
        })
}


function initialPrintCitySearched(){
    if(searchHistory.length >= 1){
    var historyHeaderElement = $("<h4>").addClass("search-prompt").text("Search History:");//figure out how to stop repeating this multiple times
    historySectionEl.append(historyHeaderElement);
        for(var i = 0; i<searchHistory.length; i++){
            var listElement = $("<button>").addClass("btn btn-sm btn-block btn-outline-primary").text(searchHistory[i]);//readme shows button NOT li
            savedCityEl.append(listElement)
        }
    }
}





function storeCitySearched(citySearched){
    if(searchHistory.length == 0){
        var historyHeaderElement = $("<h4>").addClass("search-prompt").text("Search History:"); 
        historySectionEl.append(historyHeaderElement);
    }
    if(!searchHistory.includes(citySearched)){
        searchHistory.push(citySearched);
        var listElement = $("<button>").addClass("btn btn-sm btn-block btn-outline-primary").text(citySearched);//likely need to add class here to listen for clicks
        savedCityEl.append(listElement);
        localStorage.setItem("search-history",JSON.stringify(searchHistory)); //should this be moved outside if statement or stay in? Does it matter?
    }
    else{
        return;
    }
}












function findFiveDay(data){
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
                var futureWeatherEl = $(".forecast-block"+i);
                var daysTemp = data.daily[i].temp.day;
                var daysWind = data.daily[i].wind_speed;
                var daysHumidity = data.daily[i].humidity;
                var futureDate = time.add(1, 'days').format("MMMM Do, YYYY");
                var daysIconText = data.daily[i].weather[0].icon
                var daysIconImg = "http://openweathermap.org/img/wn/"+daysIconText+"@2x.png";
                //create five day elements
                futureWeatherEl.append("<h4>"+futureDate+"</h4>");
                futureWeatherEl.append("<img src = "+daysIconImg+"></img");
                futureWeatherEl.append("<p> Temperature: "+daysTemp+" degrees</p>");
                futureWeatherEl.append("<p>Wind Speed: "+daysWind+"mph</p>");
                futureWeatherEl.append("<p>Humidity: "+daysHumidity+"%</p>");
            }
        })
}



function printCurrentWeather(data){
    currWeatherPrintEl.empty();
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
    weatherIconEl.append("<img class = weather-icon-class src = "+daysIconImg+"></img");
    currentTempEl.text("Temperature: "+currentTemp+" degrees"); 
    currentWindEl.text("Wind Speed: "+currentWind +"mph");
    currentHumidityEl.text("Humidity: "+currentHumidity+"%");
}

