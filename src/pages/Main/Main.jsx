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

  return (
    <main>
      <Hero onCitySearch={handleCitySearch} />
      {searchCity && (
        <Weather
          city={searchCity}
          onCityCleared={() => setSearchCity("")}
          deletedCities={deletedCities}
          setDeletedCities={setDeletedCities}
          onSeeMoreClick={setExpandedCity}
        />
      )}
      {expandedCity && (
        <SeeMore 
          cityName={expandedCity.name}
          weatherData={expandedCity}
        />
      )}
      <Pets keyword={searchCity} />
      <Nature />
    </main>
  );
};
