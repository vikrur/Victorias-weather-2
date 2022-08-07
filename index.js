// this code shows the current city on the main page(depends on the variable "city")
let apiKey = "10bd46f37313c8932e7471e0289ef79a";
let city = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function showCity() {
  let city = "Kyiv";
  let heading = document.querySelector("#city");
  heading.innerHTML = city;

  //   console.log(heading);
}
// dont touch (formatDate(currentTime) func)
function insertActualData() {
  let date = new Date();
  let dayNumber = date.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //   function formatDate(timestamp) {
  //     console.log(`this is ${timestamp}`);
  //     let date = new Date(timestamp * 1000);
  //     let day = date.getDay();
  //     let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  //     return days[day];
  //   }

  // define time variables
  let dayName = days[date.getDay()];

  //   console.log(dayNumber);
  //   console.log(date);
  let month = months[date.getMonth()];

  // change day and month on the webpage
  let maindate = document.querySelector("#maindate");
  maindate.innerHTML = `${dayName}, ${dayNumber} ${month}`;

  // change time on the webpage
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let maintime = document.querySelector("#maintime");

  maintime.innerHTML = `${hours}:${minutes}`;
}
// gets coordinates
function getForecast(coordinates) {
  //   console.log(coordinates);
  let apiKey = "10bd46f37313c8932e7471e0289ef79a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// function that shows real temperature on the main page before reloading and after
function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature-main");
  let temperatureDescription = document.querySelector(
    "#temperature-description"
  );

  temperatureElement.innerHTML = `${temperature}°C`;
  temperatureDescription.innerHTML = response.data.weather[0].description;

  let windSpeed = response.data.wind.speed;
  let windElement = document.querySelector("#wind-main");

  windElement.innerHTML = `${windSpeed} m/s`;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity-main");

  humidityElement.innerHTML = `${humidity}%`;

  let iconElement = document.querySelector("#icon");
  console.log(response.data.weather[0].description);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

axios.get(apiUrl).then(showTemperature);

function handleSubmit(event) {
  event.preventDefault();
  // let apiKey = "10bd46f37313c8932e7471e0289ef79a";
  let cityName = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=10bd46f37313c8932e7471e0289ef79a&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function formatD(timestamp) {
  //   console.log(`this is ${timestamp}`);
  let dateNew = new Date(timestamp * 1000);
  //   console.log(`this is 2 ${dateNew}`);
  let day = dateNew.getDay();
  //   console.log(`this is 3 ${day}`);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  //   console.log(`this is 4 ${days[day]}`);
  return days[day];
}

function displayForecast(response) {
  //   console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      console.log(forecastDay.weather[0].icon);
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-day">${formatD(forecastDay.dt)}</div>
                <div class="weather-icon">
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt="" width="42" />
                </div>
                <div class="weatherCard-temp">
                  <span class="weatherCard-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weatherCard-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Feature #0 this function shows the current city on the main page(depends on the variable "city")
showCity();

// Feature #1
insertActualData();

// Feature #2
let specialButton = document.querySelector("#search-form");
specialButton.addEventListener("submit", handleSubmit);

let searchForm = document.querySelector("#search-addon");
searchForm.addEventListener("click", handleSubmit);

// Feature #3 Display cards
// displayForecast();
