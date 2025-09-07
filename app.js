const apiKey = "34e080051ea8477aa0480331252608"; // your WeatherAPI.com key

async function getWeather() {
  const city = document.getElementById("city").value;
  const weatherDiv = document.getElementById("weather");

  if (!city) {
    weatherDiv.innerHTML = "❌ Please enter a city name";
    return;
  }

  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    weatherDiv.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p>🌡️ Temp: ${data.current.temp_c}°C</p>
      <p>☁️ Condition: ${data.current.condition.text}</p>
      <p>💧 Humidity: ${data.current.humidity}%</p>
      <p>🌬️ Wind: ${data.current.wind_kph} kph</p>
      <img src="https:${data.current.condition.icon}" alt="Weather icon">
    `;
  } catch (error) {
    weatherDiv.innerHTML = "⚠️ Error: " + error.message;
  }
}
