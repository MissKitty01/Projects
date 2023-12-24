const apiKey = "1879c1f02fcfd3d02ac348cf1f4f5c99";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcon.src = "cloud.png";
          break;
        case "Clear":
          weatherIcon.src = "sunny.png";
          break;
        case "Rain":
          weatherIcon.src = "rain.png";
          break;
        case "Mist":
          weatherIcon.src = "mist.png";
          break;
        case "Snow":
          weatherIcon.src = "snow.png";
          break;
        case "Drizzle":
          weatherIcon.src = "drizzle.png";
          break;
        default:
          weatherIcon.src = "";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
