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
}
