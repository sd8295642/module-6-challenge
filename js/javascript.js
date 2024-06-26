//searchedCities = document.querySelector('#searched-cities')
const searchBtn = document.querySelector('#search-btn')
const locations = ""
const searchedLocations = JSON.parse(localStorage.getItem('locations')) || []
let aside = document.querySelector('#city-names')
let forecast = document.querySelector('#forecast')
const weatherKey = 'faa2ce39fffbcae832da1981ce4aefe7';

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

function displaySearchedCities() {
    for(searchedEl of searchedLocations){
      let cityName = document.createElement('button')
      cityName.textContent = searchedEl
      aside.appendChild(cityName)
    };
};

displaySearchedCities();

function convertCityToCoordinates(searchedEl) {
  console.log('hello')
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedEl}&limit=3&appid=${weatherKey}`)
  .then(function (response) {
    return response.json();
  })
  .then(data => {
    let lat = data[0].lat
    let lon = data[0].lon

    console.log(lat)
    console.log(lon)

    getCurrentForecast(lat, lon);
    })
}

function getCurrentForecast(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}&units=imperial`)
  .then(function (answer) {
    return answer.json();
  })
  .then(fiveDay => {
    displayCurrent(fiveDay[0], fiveDay.city.name)
    console.log('hello', fiveDay);
    console.log (fiveDay.list[0].main.humidity)
    for (let i = 7;  i < fiveDay.list.length; i += 8) {
      const forecastItem = {
        //let date = day.dt need to import day js
        icon: `https://openweathermap.org/img/wn/${fiveDay.list[i].weather[0].icon}@2x.png`
        //let temp = 
        //let wind = 
        //let humidity = 
      }
      console.log(forecastItem)
    }
  })
}
 function displayCurrent(currentDay, cityName) {
  const currentWeather = `
  <div class="card" style="width: 60%;">
  <div class="card-body">
    <h5 class="card-title">${cityName}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>`;

  htmlCard = document.getElementById('current-weather')
  htmlCard.innerHTML = currentWeather

 }

searchBtn.addEventListener('click', searchCity)
    