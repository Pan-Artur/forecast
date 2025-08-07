import { useState } from 'react';
import { Hero } from "./Hero/Hero";
// import { Weather } from "./Weather/Weather";
import { Pets } from "./Pets/Pets";
import { Nature } from "./Nature/Nature";

export const Main = () => {
  const [searchCity, setSearchCity] = useState('');

  return (
    <main>
      <Hero onCitySearch={setSearchCity} />
      {/* {searchCity && <Weather city={searchCity} />} */}
      <Pets keyword={searchCity} />
      <Nature />
    </main>
  );
}