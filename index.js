function changeTemp(response) {
  let temp = document.querySelector("#temp");
  let temperature = response.data.temperature.current;

  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  temp.innerHTML = Math.round(temperature);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#Humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let dateTime = document.querySelector("#dateTime");
  let date = new Date(response.data.time * 1000);
  dateTime.innerHTML = getDateTime(date);

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src ="${response.data.condition.icon_url}" class = "weather-app-icon" />`;

  getForecast(response.data.city);
}
function getDateTime(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function findCity(city) {
  let apiKey = "b6e06o2b641ddbc9et442a295318f3fd";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(changeTemp);
}

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");

  findCity(input.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "b6e06o2b641ddbc9et442a295318f3fd";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(showForecast);
}

function showForecast(response) {
  console.log(response.data);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="weather-forecast">
      <div class="row">
        <div class="col-2">
         <div class="weather-forecast-date">
          ${formatDay(day.time)}
         </div>
          <span class= "forecast-emoji">
          <img src="${day.condition.icon_url}"/>
          </span> 
         
            <span class="weather-forecast-temperature-min">
              
          ${Math.round(day.temperature.minimum)}°
          </span>
            <span class="weather-forecast-temperature-max">
              
          ${Math.round(day.temperature.maximum)}°
          </span>
          
          
        </div>
      </div>
    </div>
    
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}
let formInput = document.querySelector("#form");
formInput.addEventListener("submit", changeCity);

findCity("Paris");
