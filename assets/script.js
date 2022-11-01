//figure out city API
//input.val() ???
//search suggestions
//var citySearched = "input"
var myKey = "9ee067cb6c60d1cf1d72062b348c22a8"




$("button").on("click", function(event){
    event.preventDefault();
    console.log("Hi Sylvia");
})

//search by city
//used api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}


function findCurrentCityTemp(){
var citySearchedURL = "https://api.openweathermap.org/data/2.5/forecast?q="+citySearched+"&appid="+myKey
}



function findFiveDay(){
//var latVal = //
//var lonVal = //
var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+latVal+"&lon="+lonVal+"&appid="+myKey

}