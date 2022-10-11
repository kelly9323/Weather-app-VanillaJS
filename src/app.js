function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
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
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  tempFeel.innerHTML = Math.round(response.data.main.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  cloudsElement.innerHTML = response.data.clouds.all;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city){
let apiKey = "9d7ae4b49b3b06e0a622dcc71f2df3b4";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
