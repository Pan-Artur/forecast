import { useState } from "react";
import { fetchWeeklyForecast } from "../../assets/services/weatherService";
import { Hero } from "./Hero/Hero";
import { Weather } from "./Weather/Weather";
import { SeeMore } from "./SeeMore/SeeMore";
import { HourlyForecast } from "./Forecast/HourlyForecast/HourlyForecast";
import { WeeklyForecast } from "./Forecast/WeeklyForecast/WeeklyForecast";
import { Pets } from "./Pets/Pets";
import { Nature } from "./Nature/Nature";

export const Main = () => {
  const [searchCity, setSearchCity] = useState("");
  const [deletedCities, setDeletedCities] = useState({});
  const [expandedCity, setExpandedCity] = useState(null);
  const [forecastCity, setForecastCity] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [weeklyForecastCity, setWeeklyForecastCity] = useState(null);
  const [currentActiveCityId, setCurrentActiveCityId] = useState(null);
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  const [activeForecastType, setActiveForecastType] = useState(null);

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
  const closeAllSections = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setExpandedCity(null);
      setForecastCity(null);
      setWeeklyForecastCity(null);
      setCurrentActiveCityId(null);
      setIsAnyModalOpen(false);
      setActiveForecastType(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleSeeMoreClick = (cityWeather) => {
    if (!cityWeather || expandedCity?.id === cityWeather.id) {
      closeAllSections();
      return;
    }

    setIsAnimating(true);
    setTimeout(() => {
      setExpandedCity(cityWeather);
      setForecastCity(null);
      setWeeklyForecastCity(null);
      setCurrentActiveCityId(cityWeather.id);
      setIsAnyModalOpen(true);
      setActiveForecastType(null);
      setIsAnimating(false);
    }, 500);
  };

  const toggleHourlyForecast = (cityWeather) => {
    if (forecastCity?.id === cityWeather.id) {
      setIsAnimating(true);
      setTimeout(() => {
        setForecastCity(null);
        setCurrentActiveCityId(null);
        setIsAnyModalOpen(false);
        setActiveForecastType(null);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setForecastCity(cityWeather);
        setCurrentActiveCityId(cityWeather.id);
        setIsAnyModalOpen(true);
        setActiveForecastType("hourly");
        setIsAnimating(false);
      }, 500);
    }
  };

  const toggleWeeklyForecast = async (cityWeather) => {
    if (weeklyForecastCity?.id === cityWeather.id) {
      setIsAnimating(true);
      setTimeout(() => {
        setWeeklyForecastCity(null);
        setCurrentActiveCityId(null);
        setIsAnyModalOpen(false);
        setActiveForecastType(null);
        setIsAnimating(false);
      }, 300);
    } else {
      try {
        setIsAnimating(true);
        const forecastData = await fetchWeeklyForecast(cityWeather.name);
        setTimeout(() => {
          setWeeklyForecastCity({
            ...cityWeather,
            list: forecastData.list,
          });
          setCurrentActiveCityId(cityWeather.id);
          setIsAnyModalOpen(true);
          setActiveForecastType("weekly");
          setIsAnimating(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching weekly forecast:", error);
        setIsAnimating(false);
      }
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
          onWeeklyForecastClick={toggleWeeklyForecast}
          expandedCityId={expandedCity?.id}
          forecastCityId={forecastCity?.id}
          weeklyForecastCityId={weeklyForecastCity?.id}
          currentActiveCityId={currentActiveCityId}
          isAnyModalOpen={isAnyModalOpen}
          activeForecastType={activeForecastType}
        />
      )}
      {expandedCity && (
        <SeeMore
          cityName={expandedCity.name}
          weatherData={expandedCity}
          isActive={true}
          isAnimating={isAnimating}
          onClose={() => handleSeeMoreClick(null)}
        />
      )}
      {forecastCity && (
        <HourlyForecast
          cityName={forecastCity.name}
          isActive={true}
          isAnimating={isAnimating}
          onClose={() => toggleHourlyForecast(forecastCity)}
        />
      )}
      {weeklyForecastCity && (
        <WeeklyForecast
          cityWeather={weeklyForecastCity}
          isActive={true}
          isAnimating={isAnimating}
          onClose={() => toggleWeeklyForecast(weeklyForecastCity)}
        />
      )}
      <Pets keyword={searchCity} />
      <Nature />
    </main>
  );
};