import { useState } from "react";

import { Container } from "../../../components/Container/Container";

import { IoSearch } from "react-icons/io5";

import style from "./Hero.module.scss";

export const Hero = ({ onCitySearch }) => {
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const formatDate = () => {
    const date = new Date();
    const monthYear = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate();

    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) suffix = "st";
    else if (day === 2 || day === 22) suffix = "nd";
    else if (day === 3 || day === 23) suffix = "rd";

    return (
      <>
        {monthYear}
        <br />
        {weekday}, {day}
        <sup>{suffix}</sup>
      </>
    );
  };

  const handleSearch = () => {
    setSubmitted(true);

    if (!city.trim()) {
      setError(true);
      return;
    }

    onCitySearch(city.trim());
    setCity("");
    setError(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className={style.hero}>
      <Container className={style.hero__container}>
        <h2 className={style.hero__title}>Weather dashboard</h2>
        <ul className={style.hero__couple}>
          <li className={style.hero__item}>
            <p className={style.hero__advice}>
              <span className={style.hero__description}>
                Create your personal list of favorite cities and always be aware
                of the weather.
              </span>
            </p>
          </li>
          <li className={style.hero__item}>
            <p className={style.hero__date}>{formatDate()}</p>
          </li>
        </ul>
        <div className={style.hero__box}>
          <input
            className={style.hero__input}
            type="text"
            placeholder="Search city..."
            aria-label="Search city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setSubmitted(false);
            }}
            onKeyDown={handleKeyPress}
          />
          <button
            className={style.hero__button}
            type="button"
            aria-label="Search"
            onClick={handleSearch}
          >
            <IoSearch size={25} />
          </button>
        </div>
        {error && !city.trim() && (
          <div className={style.hero__error}>
            Please enter a city name to search
          </div>
        )}
      </Container>
    </section>
  );
};
