import { useState } from "react";
import { Hero } from "./Hero/Hero";
import { Weather } from "./Weather/Weather";
import { SeeMore } from "./SeeMore/SeeMore";
import { Forecast } from "./Forecast/Forecast";
import { Pets } from "./Pets/Pets";
import { Nature } from "./Nature/Nature";

export const Main = () => {
  const [searchCity, setSearchCity] = useState("");
  const [deletedCities, setDeletedCities] = useState({});
  const [expandedCity, setExpandedCity] = useState(null);
  const [showForecast, setShowForecast] = useState(false);
  const [forecastCity, setForecastCity] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCitySearch = (city) => {
    const searchQuery = city.trim();
    const normalizedSearch = searchQuery.toLowerCase();

    const deletedCityKey = Object.keys(deletedCities).find(
      (key) => key.toLowerCase() === normalizedSearch
    );

    if (deletedCityKey) {
      const cityData = deletedCities[deletedCityKey];
      setSearchCity(cityData.originalName || cityData.name);
      setDeletedCities((prev) => {
        const newDeleted = { ...prev };
        delete newDeleted[deletedCityKey];
        return newDeleted;
      });
      return;
    }

    setSearchCity(searchQuery);
  };

  const handleSeeMoreClick = (cityWeather) => {
    if (cityWeather === null) {
      setIsAnimating(true);
      setTimeout(() => {
        setExpandedCity(null);
        setIsAnimating(false);
      }, 300);
      return;
    }

    if (expandedCity?.id === cityWeather.id) {
      setIsAnimating(true);
      setTimeout(() => {
        setExpandedCity(null);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setExpandedCity(cityWeather);
        setIsAnimating(false);
      }, 500);
    }
  };

  const toggleHourlyForecast = (cityWeather) => {
    if (forecastCity?.id === cityWeather.id) {
      setShowForecast(false);
      setForecastCity(null);
    } else {
      setShowForecast(true);
      setForecastCity(cityWeather);
    }
  };

  return (
    <main>
      <Hero onCitySearch={handleCitySearch} />
      {searchCity && (
        <Weather
          city={searchCity}
          onCityCleared={() => setSearchCity("")}
          deletedCities={deletedCities}
          setDeletedCities={setDeletedCities}
          onSeeMoreClick={handleSeeMoreClick}
          onHourlyForecastClick={toggleHourlyForecast}
          expandedCityId={expandedCity?.id}
          showForecast={showForecast}
        />
      )}
      {expandedCity && (
        <SeeMore
          cityName={expandedCity.name}
          weatherData={expandedCity}
          isActive={true}
          isOtherCityActive={expandedCity !== null}
          isAnimating={isAnimating}
        />
      )}
      {showForecast && forecastCity && (
        <Forecast cityName={forecastCity.name} showHourlyForecast={true} />
      )}
      <Pets keyword={searchCity} />
      <Nature />
    </main>
  );
};