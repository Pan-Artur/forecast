const API_KEY = "f075d83dbfbfbae34a2640e861c8c267";

export const fetchWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ua&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("City not found!");
  return response.json();
};

export const fetchHourlyForecast = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("Forecast not available");
  return response.json();
};