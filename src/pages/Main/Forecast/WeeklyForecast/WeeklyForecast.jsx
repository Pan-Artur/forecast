import { Container } from "../../../../components/Container/Container";
import style from "./WeeklyForecast.module.scss";

export const WeeklyForecast = ({ cityWeather, isActive }) => {
  if (!isActive || !cityWeather || !cityWeather.list) return null;

  const getDailyStats = (forecasts) => {
    let dayTemp = -Infinity;
    let nightTemp = Infinity;
    let weatherCount = {};
    let mainWeather = forecasts[0].weather[0].main;

    const dayForecast = forecasts.find(item => {
      const hour = new Date(item.dt * 1000).getHours();
      return hour >= 12 && hour <= 15;
    }) || forecasts[Math.floor(forecasts.length / 2)];

    forecasts.forEach((item) => {
      dayTemp = Math.max(dayTemp, item.main.temp_max);
      nightTemp = Math.min(nightTemp, item.main.temp_min);

      const weatherType = item.weather[0].main;
      weatherCount[weatherType] = (weatherCount[weatherType] || 0) + 1;
      if (weatherCount[weatherType] > (weatherCount[mainWeather] || 0)) {
        mainWeather = weatherType;
      }
    });

    const icon = dayForecast.weather[0].icon.replace("n", "d");

    return {
      dayTemp: Math.round(dayTemp),
      nightTemp: Math.round(nightTemp),
      icon: icon,
      weather: mainWeather,
    };
  };

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const dayNum = date.getDate();
    return `${dayName}, ${month} ${dayNum}`;
  };

  const daysMap = new Map();

  cityWeather.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toLocaleDateString();

    if (!daysMap.has(dateKey)) {
      daysMap.set(dateKey, [item]);
    } else {
      daysMap.get(dateKey).push(item);
    }
  });

  const forecastDays = Array.from(daysMap.entries()).slice(0, 8);

  return (
    <section className={style.weeklyForecast}>
      <Container>
        <div className={style.weeklyForecast__box}>
          <h2 className={style.weeklyForecast__title}>8-day forecast</h2>
          <ul className={style.weeklyForecast__list}>
            {forecastDays.map(([date, forecasts]) => {
              const daily = getDailyStats(forecasts);
              return (
                <li key={date} className={style.weeklyForecast__item}>
                  <p className={style.weeklyForecast__day}>
                    {formatDay(forecasts[0].dt)}
                  </p>
                  <div className={style.weeklyForecast__temperature}>
                    <div className={style.weeklyForecast__icon}>
                      <img
                        src={`https://openweathermap.org/img/wn/${daily.icon}@2x.png`}
                        alt={daily.weather}
                        width="50"
                        height="50"
                      />
                    </div>
                    <p className={style.weeklyForecast__collation}>
                      {`${daily.dayTemp}/${daily.nightTemp}°C`}
                    </p>
                  </div>
                  <p className={style.weeklyForecast__description}>
                    {daily.weather}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
};