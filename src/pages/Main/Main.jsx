import { useState } from "react";
import { Hero } from "./Hero/Hero";
import { Weather } from "./Weather/Weather";
import { SeeMore } from "./SeeMore/SeeMore";
import { Pets } from "./Pets/Pets";
import { Nature } from "./Nature/Nature";

export const Main = () => {
  const [searchCity, setSearchCity] = useState("");
  const [deletedCities, setDeletedCities] = useState({});
  const [expandedCity, setExpandedCity] = useState(null);
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
          expandedCityId={expandedCity?.id}
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
      <Pets keyword={searchCity} />
      <Nature />
    </main>
  );
};
