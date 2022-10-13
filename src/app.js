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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-3">
                <div class="col-wrapper">
                    <div class="weather-forecast-day">${day}</div>
                      <img
                        src="src/img/icon-rain-bottom.png"
                        alt="rain"
                        class="image-weather-details"
                      />
                    <div class="temperature-weather-forecast">
                      <span class="max-temp">20</span>  
                     <span class="min-temp">17</span>
                    </div>
                    
                </div>
                
              </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
displayForecast();
