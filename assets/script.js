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
    var citySearchedURL = "https://api.openweathermap.org/data/2.5/forecast?q="+citySearched+"&appid="+myKey
    console.log(citySearchedURL)
    fetch(citySearchedURL)
        .then(function(response) {
        console.log(response);
        if (response.status === 200) {
        console.log("OK!")
        }
        else{
        alert("Please enter a valid city name")
        }
        return response.json();
        });


}




// function getApi(requestUrl) {
//   fetch(requestUrl)
//     .then(function (response) {
//       console.log(response);
//       if (response.status === 200) {
//         responseText.textContent = response.status;
//       }
//       return response.json();
//   });
// }

// getApi(requestUrl);







//search by city
//used api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}


function findCurrentCityTemp(){

}



function findFiveDay(){
//var latVal = //
//var lonVal = //
var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+latVal+"&lon="+lonVal+"&appid="+myKey

}
