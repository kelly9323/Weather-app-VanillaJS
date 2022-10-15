function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthArray[date.getMonth()];
  let day = date.getDate();

  let weekDay = weekDays[date.getDay()];
  return `Upd: ${weekDay}, ${day} ${month} </br> ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4){
    forecastHTML =
      forecastHTML +
      ` <div class="col-3">
                <div class="col-wrapper">
                    <div class="weather-forecast-day">${formatDay(
                      forecastDay.dt
                    )}</div>
  
                      <img
                        src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png"
                        alt=""
                        class="image-weather-details"
                      />
                    <div class="temperature-weather-forecast">
                      <span class="max-temp">${Math.round(forecastDay.temp.max)}°</span>  
                     <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
                    </div>
                    
                </div>
                
              </div>`;
                      }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let keyApi = "a43564c91a6c605aeb564c9ed02e3858";
  let urlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${keyApi}&units=metric`;
  axios.get(urlApi).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let tempFeel = document.querySelector("#feelsLike");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let cloudsElement = document.querySelector("#clouds");
  let dateElement = document.querySelector("#weekDay");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  feelsLikeElement = Math.round(response.data.main.feels_like);

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  tempFeel.innerHTML = Math.round(response.data.main.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  cloudsElement.innerHTML = response.data.clouds.all;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "9d7ae4b49b3b06e0a622dcc71f2df3b4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function showFtemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let feelsLike = (feelsLikeElement * 9) / 5 + 32;
  let tempFeel = document.querySelector("#feelsLike");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  tempFeel.innerHTML = Math.round(feelsLike);
}

function showCtemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  let tempFeel = document.querySelector("#feelsLike");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  tempFeel.innerHTML = Math.round(feelsLikeElement);
}

function geolocationRequest() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let APIkey = "9d7ae4b49b3b06e0a622dcc71f2df3b4";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${APIkey}`;
  axios.get(url).then(displayTemperature);
}

let celsiusTemperature = null;
let feelsLikeElement = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFtemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCtemp);

let submitLocation = document.querySelector("#geolocation-button");
submitLocation.addEventListener("click", geolocationRequest);

search("New York");
