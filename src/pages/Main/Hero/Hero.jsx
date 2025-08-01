import { Container } from "../../../components/Contaner/Container";

import { IoSearch } from "react-icons/io5";

import style from "./Hero.module.scss";

export const Hero = () => {
  return (
    <section classname={style.hero}>
      <Container>
        <h2 className={style.hero__title}>
          Weather dashboard
        </h2>
        <ul className={style.hero__couple}>
          <li className={style.hero__item}>
            <p className={style.hero__advice}>
              Create your personal list of favorite cities and always be aware of the weather.
            </p>
          </li>
          <li className={style.hero__item}>
            <p className={style.hero__date}>
              ...
            </p>
          </li>
        </ul>
        <div className={style.hero__box}>
          <input className={style.hero__input} type="text" placeholder="Search location..." />
          <button className={style.hero__button} type="button">
            <IoSearch />
          </button>
        </div>
      </Container>
    </section>
  );
}