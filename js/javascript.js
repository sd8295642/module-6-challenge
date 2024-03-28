//searchedCities = document.querySelector('#searched-cities')
const citySearchBtn = document.querySelector('#searched-cities')
const locations = ""
const searchedLocations = JSON.parse(localStorage.getItem('locations')) || []
let aside = document.querySelector('#city-names')

function searchCity(event) {
    event.preventDefault();
  
    const searchedEl = document.querySelector('#city').value;
  
    if (!searchedEl) {
      console.error('You need a search input value!');
      return;
    };

    convertCityToCoordinates(searchedEl);

    searchedLocations.push(searchedEl); 

    localStorage.setItem("locations", JSON.stringify(searchedLocations));
    
    let cityName = document.createElement('button')
    cityName.textContent = searchedEl
    aside.appendChild(cityName)
  };
  
citySearchBtn.addEventListener('submit', searchCity);

function displaySearchedCities() {
    for(searchedEl of searchedLocations){
      let cityName = document.createElement('button')
      cityName.textContent = searchedEl
      aside.appendChild(cityName)
    };
};

displaySearchedCities();

function convertCityToCoordinates(searchedEl) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedEl}&limit=3&appid=faa2ce39fffbcae832da1981ce4aefe7`)
  .then(function (response) {
    console.log(response.json());
    return response.json();
  })
  .then(data => {
    let lat = data[0].lat
    let lon = data[0].lon
    
    displayCurrentWeather();
    })
}

function displayCurrentWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}lon=${lon}&appid=faa2ce39fffbcae832da1981ce4aefe7`)
  .then(function (response) {
    console.log(response.json());
    return response.json();
  })

}
    