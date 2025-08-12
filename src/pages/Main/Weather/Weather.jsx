import { useState, useEffect, useRef } from "react";

import { getName } from "country-list";

import { Container } from "../../../components/Container/Container.jsx";

import { FaHeart, FaRegHeart } from "react-icons/fa6";

import style from "./Weather.module.scss";

export const Weather = ({
  city,
  setDeletedCities,
  onSeeMoreClick,
  expandedCityId,
  onHourlyForecastClick,
  onWeeklyForecastClick,
  isAnyModalOpen,
  currentActiveCityId,
  activeForecastType,
}) => {
  const [searchedCities, setSearchedCities] = useState([]);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [nearestHours, setNearestHours] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animations, setAnimations] = useState({
    like: null,
    refresh: null,
    removing: null,
  });
  const [notifications, setNotifications] = useState([]);

  const API_KEY = "f075d83dbfbfbae34a2640e861c8c267";

  const addNotification = (message, type = "error") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, fading: true }
          : notification
      )
    );

    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, 500);
  };

  const updateNearestFullHour = (timezoneOffset) => {
    const now = new Date();
    const localTime = new Date(now.getTime() + timezoneOffset * 1000);

    const currentMinutes = localTime.getUTCMinutes();
    const currentSeconds = localTime.getUTCSeconds();

    let nearestHour = new Date(localTime);

    if (
      currentMinutes >= 30 ||
      (currentMinutes === 0 && currentSeconds === 0)
    ) {
      nearestHour.setUTCHours(localTime.getUTCHours() + 1, 0, 0, 0);
    } else {
      nearestHour.setUTCHours(localTime.getUTCHours(), 0, 0, 0);
    }

    const hours = String(nearestHour.getUTCHours()).padStart(2, "0");
    const minutes = String(nearestHour.getUTCMinutes()).padStart(2, "0");

    const day = String(localTime.getUTCDate()).padStart(2, "0");
    const month = String(localTime.getUTCMonth() + 1).padStart(2, "0");
    const year = localTime.getUTCFullYear();
    const date = `${day}.${month}.${year}`;

    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = weekdays[localTime.getUTCDay()];

    return {
      time: `${hours}:${minutes}`,
      date,
      weekday,
    };
  };

  useEffect(() => {
    const updateAllNearestHours = () => {
      const updateTimes = {};

      [...favoriteCities, ...searchedCities].forEach((city) => {
        updateTimes[city.name] = updateNearestFullHour(city.timezone);
      });

      setNearestHours(updateTimes);
    };

    const timer = setInterval(() => {
      updateAllNearestHours();
    }, 60000);

    updateAllNearestHours();

    return () => clearInterval(timer);
  }, [favoriteCities, searchedCities]);

  const isFetching = useRef(false);
  const prevCityRef = useRef("");

  useEffect(() => {
    if (
      !city ||
      !city.trim() ||
      isFetching.current ||
      city === prevCityRef.current
    )
      return;

    isFetching.current = true;
    prevCityRef.current = city;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const normalizedCity = city.trim().toLowerCase();
        const isDuplicate = [...favoriteCities, ...searchedCities].some(
          (c) => c.name.toLowerCase() === normalizedCity
        );

        if (isDuplicate) {
          addNotification("This city has already been added!", "warning");
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ua&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("City not found!");
        }

        const data = await response.json();

        const isDataDuplicate = [...favoriteCities, ...searchedCities].some(
          (c) => c.id === data.id
        );

        if (isDataDuplicate) {
          addNotification("This city has already been added!", "warning");
          return;
        }

        setSearchedCities((prev) => {
          const alreadyExists = prev.some((c) => c.id === data.id);
          return alreadyExists ? prev : [...prev, data];
        });

        setNearestHours((prev) => ({
          ...prev,
          [data.name]: updateNearestFullHour(data.timezone),
        }));
      } catch (error) {
        setError(error.message);
        addNotification(error.message);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    };

    fetchWeather();

    return () => {
      isFetching.current = false;
    };
  }, [city, favoriteCities, searchedCities]);

  if (!city) return null;

  const handleHourlyForecastClick = (cityWeather) => {
    onHourlyForecastClick(cityWeather);
  };

  const handleWeeklyForecastClick = (cityWeather) => {
    onWeeklyForecastClick(cityWeather);
  };

  const handleRefreshClick = (cityName) => {
    setLoading(true);
    setError(null);

    setAnimations((prev) => ({ ...prev, refresh: cityName }));
    setTimeout(
      () => setAnimations((prev) => ({ ...prev, refresh: null })),
      500
    );

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=ua&appid=${API_KEY}`
    )
      .then((response) => {
        addNotification("Update was successful!", "success");

        if (!response.ok) {
          addNotification("Date update error!", "error");

          throw new Error("Date update error!");
        }
        return response.json();
      })
      .then((data) => {
        setFavoriteCities((prevState) => {
          const updatedCities = prevState.map((item) =>
            item.name === cityName ? data : item
          );
          return updatedCities;
        });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleLikeClick = (cityWeather) => {
    const isFavorite = favoriteCities.some(
      (city) => city.id === cityWeather.id
    );

    setAnimations((prev) => ({ ...prev, like: cityWeather.id }));
    setTimeout(() => setAnimations((prev) => ({ ...prev, like: null })), 1000);

    if (isFavorite) {
      setFavoriteCities((prev) =>
        prev.filter((city) => city.id !== cityWeather.id)
      );
      setSearchedCities((prev) => [...prev, cityWeather]);
      addNotification("City removed from favorites.", "info");
    } else {
      setFavoriteCities((prev) => [...prev, cityWeather]);
      setSearchedCities((prev) =>
        prev.filter((city) => city.id !== cityWeather.id)
      );
      addNotification("City added to favorites.", "success");
    }
  };

  const handleSeeMoreClick = (cityWeather) => {
    if (expandedCityId && expandedCityId !== cityWeather.id) return;

    onSeeMoreClick(cityWeather);
  };

  const handleDeleteClick = (cityName, cityData, wasFavorite = false) => {
    setAnimations((prev) => ({ ...prev, removing: cityName }));

    const isCurrentExpanded = expandedCityId === cityData?.id;

    if (isCurrentExpanded) {
      onSeeMoreClick(null);
    }

    setTimeout(() => {
      setDeletedCities((prev) => ({
        ...prev,
        [cityName.toLowerCase()]: {
          ...cityData,
          originalName: cityName,
          wasFavorite,
        },
      }));

      setSearchedCities((prev) => prev.filter((c) => c.name !== cityName));
      setFavoriteCities((prev) => prev.filter((c) => c.name !== cityName));
      setAnimations((prev) => ({ ...prev, removing: null }));
      addNotification(`City ${cityName} deleted`, "info");
    }, 300);
  };

  return (
    <section className={style.weather}>
      <Container>
        <div className={style.weather__notifications}>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${style.weather__notification} ${
                style[notification.type]
              } ${
                notification.fading
                  ? style["weather__notification--fading"]
                  : ""
              }`}
              onClick={() => removeNotification(notification.id)}
            >
              {notification.message}
            </div>
          ))}
        </div>
        {!loading &&
        searchedCities.length === 0 &&
        favoriteCities.length === 0 ? (
          <div className={style.weather__empty}>
            <p>
              No cities found yet. Search for a city to see weather information.
            </p>
          </div>
        ) : (
          <ul className={style.weather__list}>
            {favoriteCities.map((cityWeather, index) => (
              <li
                key={`favorite-${cityWeather.name}-${index}`}
                className={style.weather__item}
              >
                <h2 className={style.weather__title}>
                  <span className={style.weather__city}>
                    {cityWeather.name}
                  </span>
                  <span className={style.weather__country}>
                    {getName(cityWeather.sys.country)}
                  </span>
                </h2>
                <div className={style.weather__content}>
                  <p className={style.weather__time}>
                    {nearestHours[cityWeather.name]?.time}
                  </p>
                  <div className={style.weather__forecasts}>
                    <button
                      className={`${style.weather__forecast} ${style.weather__hourly}`}
                      onClick={() => handleHourlyForecastClick(cityWeather)}
                      disabled={
                        (isAnyModalOpen &&
                          currentActiveCityId !== cityWeather.id) ||
                        (activeForecastType &&
                          activeForecastType !== "hourly" &&
                          currentActiveCityId !== cityWeather.id)
                      }
                    >
                      Hourly forecast
                    </button>
                    <button
                      className={`${style.weather__forecast} ${style.weather__weekly}`}
                      onClick={() => handleWeeklyForecastClick(cityWeather)}
                      disabled={
                        (isAnyModalOpen &&
                          currentActiveCityId !== cityWeather.id) ||
                        (activeForecastType &&
                          activeForecastType !== "weekly" &&
                          currentActiveCityId !== cityWeather.id)
                      }
                    >
                      Weekly forecast
                    </button>
                  </div>
                  <ul className={style.weather__couple}>
                    <li className={style.weather__term}>
                      <p className={style.weather__date}>
                        {nearestHours[cityWeather.name]?.date}
                      </p>
                    </li>
                    <li className={style.weather__term}>
                      <p className={style.weather__weekday}>
                        {nearestHours[cityWeather.name]?.weekday}
                      </p>
                    </li>
                  </ul>
                  <div className={style.weather__icon}>
                    {cityWeather.weather[0].icon && (
                      <img
                        src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@4x.png`}
                        alt={cityWeather.weather[0].description}
                      />
                    )}
                  </div>
                  <div className={style.weather__temperature}>
                    {Math.round(cityWeather.main.temp)}°C
                  </div>
                </div>
                <div className={style.weather__managment}>
                  <button
                    onClick={() => handleRefreshClick(cityWeather.name)}
                    className={`${style.weather__manage} ${
                      style.weather__refresh
                    } ${
                      animations.refresh === cityWeather.name
                        ? style["weather__refresh--active"]
                        : ""
                    }`}
                    type="button"
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      link="http://www.w3.org/1999/xlink"
                    >
                      <rect
                        width="30"
                        height="30"
                        fill="url(#pattern0_11_41)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_11_41"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_11_41"
                            transform="scale(0.00195312)"
                          />
                        </pattern>
                        <image
                          id="image0_11_41"
                          width="512"
                          height="512"
                          preserveAspectRatio="none"
                          href="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleLikeClick(cityWeather)}
                    className={`${style.weather__manage} ${
                      style.weather__like
                    } ${
                      animations.like === cityWeather.id
                        ? style["weather__like--active"]
                        : ""
                    }`}
                    type="button"
                  >
                    {favoriteCities.some(
                      (city) => city.id === cityWeather.id
                    ) ? (
                      <FaHeart size={30} style={{ fill: "#fb4646" }} />
                    ) : (
                      <FaRegHeart size={30} style={{ fill: "#fb4646" }} />
                    )}
                  </button>
                  <button
                    className={`${style.weather__more} ${
                      expandedCityId === cityWeather.id
                        ? style.weather__more_active
                        : ""
                    }`}
                    onClick={() => handleSeeMoreClick(cityWeather)}
                    disabled={
                      isAnyModalOpen &&
                      currentActiveCityId !== cityWeather.id &&
                      currentActiveCityId !== null
                    }
                  >
                    {expandedCityId === cityWeather.id
                      ? "See Less"
                      : "See More"}
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteClick(cityWeather.name, cityWeather)
                    }
                    className={`${style.weather__manage} ${
                      animations.removing === cityWeather.name
                        ? style["weather__item--removing"]
                        : ""
                    }`}
                    type="button"
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      link="http://www.w3.org/1999/xlink"
                    >
                      <rect
                        width="30"
                        height="30"
                        fill="url(#pattern0_11_43)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_11_43"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_11_43"
                            transform="scale(0.00195312)"
                          />
                        </pattern>
                        <image
                          id="image0_11_43"
                          width="512"
                          height="512"
                          preserveAspectRatio="none"
                          href="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
            {searchedCities.map((cityWeather, index) => (
              <li
                key={`search-${cityWeather.name}-${index}`}
                className={style.weather__item}
              >
                <h2 className={style.weather__title}>
                  <span className={style.weather__city}>
                    {cityWeather.name}
                  </span>
                  <span className={style.weather__country}>
                    {getName(cityWeather.sys.country)}
                  </span>
                </h2>
                <div className={style.weather__content}>
                  <p className={style.weather__time}>
                    {nearestHours[cityWeather.name]?.time}
                  </p>
                  <div className={style.weather__forecasts}>
                    <button
                      className={`${style.weather__forecast} ${style.weather__hourly}`}
                      onClick={() => handleHourlyForecastClick(cityWeather)}
                      disabled={
                        (isAnyModalOpen &&
                          currentActiveCityId !== cityWeather.id) ||
                        (activeForecastType &&
                          activeForecastType !== "hourly" &&
                          currentActiveCityId !== cityWeather.id)
                      }
                    >
                      Hourly forecast
                    </button>
                    <button
                      className={`${style.weather__forecast} ${style.weather__weekly}`}
                      onClick={() => handleWeeklyForecastClick(cityWeather)}
                      disabled={
                        (isAnyModalOpen &&
                          currentActiveCityId !== cityWeather.id) ||
                        (activeForecastType &&
                          activeForecastType !== "weekly" &&
                          currentActiveCityId !== cityWeather.id)
                      }
                    >
                      Weekly forecast
                    </button>
                  </div>
                  <ul className={style.weather__couple}>
                    <li className={style.weather__term}>
                      <p className={style.weather__date}>
                        {nearestHours[cityWeather.name]?.date}
                      </p>
                    </li>
                    <li className={style.weather__term}>
                      <p className={style.weather__weekday}>
                        {nearestHours[cityWeather.name]?.weekday}
                      </p>
                    </li>
                  </ul>
                  <div className={style.weather__icon}>
                    {cityWeather.weather[0].icon && (
                      <img
                        src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@4x.png`}
                        alt={cityWeather.weather[0].description}
                      />
                    )}
                  </div>
                  <div className={style.weather__temperature}>
                    {Math.round(cityWeather.main.temp)}°C
                  </div>
                </div>
                <div className={style.weather__managment}>
                  <button
                    onClick={() => handleRefreshClick(cityWeather.name)}
                    className={`${style.weather__manage} ${
                      style.weather__refresh
                    } ${
                      animations.refresh === cityWeather.name
                        ? style["weather__refresh--active"]
                        : ""
                    }`}
                    type="button"
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      link="http://www.w3.org/1999/xlink"
                    >
                      <rect
                        width="30"
                        height="30"
                        fill="url(#pattern0_11_41)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_11_41"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_11_41"
                            transform="scale(0.00195312)"
                          />
                        </pattern>
                        <image
                          id="image0_11_41"
                          width="512"
                          height="512"
                          preserveAspectRatio="none"
                          href="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleLikeClick(cityWeather)}
                    className={`${style.weather__manage} ${
                      style.weather__like
                    } ${
                      animations.like === cityWeather.id
                        ? style["weather__like--active"]
                        : ""
                    }`}
                    type="button"
                  >
                    {favoriteCities.some(
                      (city) => city.id === cityWeather.id
                    ) ? (
                      <FaHeart size={30} style={{ fill: "#fb4646" }} />
                    ) : (
                      <FaRegHeart size={30} style={{ fill: "#fb4646" }} />
                    )}
                  </button>
                  <button
                    className={`${style.weather__more} ${
                      expandedCityId === cityWeather.id
                        ? style.weather__more_active
                        : ""
                    }`}
                    onClick={() => handleSeeMoreClick(cityWeather)}
                    disabled={
                      isAnyModalOpen &&
                      currentActiveCityId !== cityWeather.id &&
                      currentActiveCityId !== null
                    }
                  >
                    {expandedCityId === cityWeather.id
                      ? "See Less"
                      : "See More"}
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteClick(cityWeather.name, cityWeather)
                    }
                    className={`${style.weather__manage} ${
                      animations.removing === cityWeather.name
                        ? style["weather__item--removing"]
                        : ""
                    }`}
                    type="button"
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      link="http://www.w3.org/1999/xlink"
                    >
                      <rect
                        width="30"
                        height="30"
                        fill="url(#pattern0_11_43)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_11_43"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_11_43"
                            transform="scale(0.00195312)"
                          />
                        </pattern>
                        <image
                          id="image0_11_43"
                          width="512"
                          height="512"
                          preserveAspectRatio="none"
                          href="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
};
