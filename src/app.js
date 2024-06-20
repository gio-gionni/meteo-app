function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dayElement = document.querySelector("#day");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#weather-icon");
  let conditionElement = document.querySelector("#condition");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  conditionElement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = formatTime(date);
  dayElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}"/>`;
  // img src=http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png;
  //"<img src=`${response.data.condition.icon_url}`>;";
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day}`;
}

function formatTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes > 9) {
    return `${hours}:${minutes}`;
  } else {
    return `${hours}:0${minutes}`;
  }
}

function searchCity(city) {
  let apiKey = "aca2a4of530d0tf79751324ac6b3f501";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");

// data.temperature.humidity
// data.wind.speed
