import { useState, useEffect } from "react";
import style from "./Weather.module.scss";

export const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "f075d83dbfbfbae34a2640e861c8c267";

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      setWeather(null); 

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ua&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Місто не знайдено");
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (!city) return null;
  if (loading) return <div className={style.loading}>Завантаження...</div>;
  if (error) return <div className={style.error}>{error}</div>;
  if (!weather) return null;

  return (
    <section className={style.weather}>
      <div className={style.weather__header}>
        <h2 className={style.weather__title}>
          {weather.name}, {weather.sys?.country}
        </h2>
        <p className={style.weather__description}>
          {weather.weather[0]?.description}
        </p>
      </div>

      <div className={style.weather__main}>
        <div className={style.weather__temp}>
          {Math.round(weather.main?.temp)}°C
        </div>
        <div className={style.weather__details}>
          <p>Відчувається: {Math.round(weather.main?.feels_like)}°C</p>
          <p>Вологість: {weather.main?.humidity}%</p>
          <p>Вітер: {weather.wind?.speed} м/с</p>
          <p>Тиск: {weather.main?.pressure} гПа</p>
        </div>
      </div>
    </section>
  );
};
