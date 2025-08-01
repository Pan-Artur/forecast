import { Hero } from "./Hero/Hero";
import { Weather } from "./Weather/Weather";
import { Pets } from "./Pets/Pets";
import { Nature } from "./Nature/Nature";

export const Main = () => {
  return (
    <main>
      <Hero />
      <Weather />
      <Pets />
      <Nature />
    </main>
  );
}
