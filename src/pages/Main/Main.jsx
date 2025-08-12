import { useState, useEffect } from "react";
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
  const [weeklyForecastCity, setWeeklyForecastCity] = useState(null);
  const [currentActiveCityId, setCurrentActiveCityId] = useState(null);
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  const [activeForecastType, setActiveForecastType] = useState(null);

  useEffect(() => {
    if (expandedCity && deletedCities[expandedCity.name.toLowerCase()]) {
      setExpandedCity(null);
    }
    if (forecastCity && deletedCities[forecastCity.name.toLowerCase()]) {
      setForecastCity(null);
    }
    if (
      weeklyForecastCity &&
      deletedCities[weeklyForecastCity.name.toLowerCase()]
    ) {
      setWeeklyForecastCity(null);
    }

    if (!expandedCity && !forecastCity && !weeklyForecastCity) {
      setCurrentActiveCityId(null);
      setIsAnyModalOpen(false);
      setActiveForecastType(null);
    }
  }, [deletedCities, expandedCity, forecastCity, weeklyForecastCity]);

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
    if (!cityWeather || expandedCity?.id === cityWeather.id) {
      setExpandedCity(null);
      if (!forecastCity && !weeklyForecastCity) {
        setCurrentActiveCityId(null);
        setIsAnyModalOpen(false);
      }
      setActiveForecastType(null);
      return;
    }

    setExpandedCity(cityWeather);
    setCurrentActiveCityId(cityWeather.id);
    setIsAnyModalOpen(true);
    setActiveForecastType(null);
  };

  const toggleHourlyForecast = (cityWeather) => {
    if (forecastCity?.id === cityWeather.id) {
      setForecastCity(null);
      if (!expandedCity && !weeklyForecastCity) {
        setCurrentActiveCityId(null);
        setIsAnyModalOpen(false);
      }
      setActiveForecastType(null);
    } else {
      setForecastCity(cityWeather);
      setCurrentActiveCityId(cityWeather.id);
      setIsAnyModalOpen(true);
      setActiveForecastType("hourly");
    }
  };

  const toggleWeeklyForecast = async (cityWeather) => {
    if (weeklyForecastCity?.id === cityWeather.id) {
      setWeeklyForecastCity(null);
      if (!expandedCity && !forecastCity) {
        setCurrentActiveCityId(null);
        setIsAnyModalOpen(false);
      }
      setActiveForecastType(null);
    } else {
      try {
        const forecastData = await fetchWeeklyForecast(cityWeather.name);
        setWeeklyForecastCity({
          ...cityWeather,
          list: forecastData.list,
        });
        setCurrentActiveCityId(cityWeather.id);
        setIsAnyModalOpen(true);
        setActiveForecastType("weekly");
      } catch (error) {
        console.error("Error fetching weekly forecast:", error);
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
      {expandedCity && !deletedCities[expandedCity.name.toLowerCase()] && (
        <SeeMore
          cityName={expandedCity.name}
          weatherData={expandedCity}
          isActive={true}
          onClose={() => handleSeeMoreClick(null)}
        />
      )}
      {forecastCity && !deletedCities[forecastCity.name.toLowerCase()] && (
        <HourlyForecast
          cityName={forecastCity.name}
          isActive={true}
          onClose={() => toggleHourlyForecast(forecastCity)}
        />
      )}
      {weeklyForecastCity && !deletedCities[weeklyForecastCity.name.toLowerCase()] && (
        <WeeklyForecast
          cityWeather={weeklyForecastCity}
          isActive={true}
          onClose={() => toggleWeeklyForecast(weeklyForecastCity)}
        />
      )}
      <Pets keyword={searchCity} />
      <Nature />
    </main>
  );
};
