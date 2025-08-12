import { useState, useEffect } from "react";
import { Container } from "../../../components/Container/Container";

import temperatureImage from "../../../assets/images/SeeMore/temperature.webp";
import humidityImage from "../../../assets/images/SeeMore/humidity.webp";
import pressureImage from "../../../assets/images/SeeMore/pressure.webp";
import windImage from "../../../assets/images/SeeMore/wind.webp";
import visibilityImage from "../../../assets/images/SeeMore/visibility.webp";

import style from "./SeeMore.module.scss";

export const SeeMore = ({
  weatherData,
  isOtherCityActive,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const weatherDetails = [
    {
      title: "Feels like",
      value: `${Math.round(weatherData.main?.feels_like)}°C`,
      icon: temperatureImage,
    },
    {
      titles: { min: "Min °C", max: "Max °C" },
      values: {
        min: `${Math.round(weatherData.main?.temp_min)}°C`,
        max: `${Math.round(weatherData.main?.temp_max)}°C`,
      },
    },
    {
      title: "Humidity",
      value: `${weatherData.main?.humidity}%`,
      icon: humidityImage,
    },
    {
      title: "Pressure",
      value: `${weatherData.main?.pressure} Pa`,
      icon: pressureImage,
    },
    {
      title: "Wind speed",
      value: `${weatherData.wind?.speed} m/s`,
      icon: windImage,
    },
    {
      title: "Visibility",
      value: `${(weatherData.visibility / 1000).toFixed(1)} km`,
      icon: visibilityImage,
    },
  ];

  useEffect(() => {
    if (!weatherData) {
      setIsClosing(true);
      return;
    }
    
    setIsVisible(true);
  }, [isOtherCityActive, weatherData]);

  useEffect(() => {
    if (!weatherData) {
      setIsClosing(true);
      return;
    }
    
    setIsVisible(true);
  
  }, [isOtherCityActive, weatherData]);

  if (isClosing) {
    return (
      <div className={`${style.seeMore} ${style.seeMore_closing}`}>
        <Container>
          <ul className={style.seeMore__list}>
          </ul>
        </Container>
      </div>
    );
  }

  return (
    <section 
      className={`${style.seeMore} ${isVisible ? style.seeMore_visible : ''} ${isOtherCityActive ? style.highlight : ''}`}
    >
      <Container>
        <ul className={style.seeMore__list}>
          {weatherDetails.map((detail, index) => (
            <li key={index} className={style.seeMore__item}>
              {detail.title && !detail.titles && (
                <div className={style.seeMore__content}>
                  <h3 className={style.seeMore__title}>{detail.title}</h3>
                  <p className={style.seeMore__value}>{detail.value}</p>
                  <img
                    src={detail.icon}
                    alt={detail.title}
                    className={style.seeMore__icon}
                  />
                </div>
              )}
              {detail.titles && (
                <div className={style.seeMore__couple}>
                  <div>
                    <h3 className={style.seeMore__title}>
                      {detail.titles.min}
                    </h3>
                    <p className={style.seeMore__value}>{detail.values.min}</p>
                  </div>
                  <div>
                    <h3 className={style.seeMore__title}>
                      {detail.titles.max}
                    </h3>
                    <p className={style.seeMore__value}>{detail.values.max}</p>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};