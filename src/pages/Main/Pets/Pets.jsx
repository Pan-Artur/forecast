import { useState, useEffect } from "react";
import { Container } from "../../../components/Container/Container";
import styles from "./Pets.module.scss";

export const Pets = ({ keyword }) => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      setNews(null);
      console.log(keyword);
      try {
        let response;
        if (keyword === "") {
          response = await fetch(
            `https://newsapi.org/v2/everything?q=weather&pageSize=4&apiKey=a12a75963ea54bf9ae07b0291c252927`
          );
        } else {
          response = await fetch(
            `https://newsapi.org/v2/everything?q=${keyword}&pageSize=4&apiKey=a12a75963ea54bf9ae07b0291c252927`
          );
        }

        if (!response.ok) {
          throw new Error("Місто не знайдено");
        }

        const data = await response.json();

        setNews(data);

        console.log(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [keyword]);

  return (
    <>
      <section className={styles.news}>
        <Container>
          <h2 className={styles.newsTitle}>News</h2>
          <ul className={styles.newsList}>
            {news?.articles?.map((article) => (
              <li className={styles.newsItem}>
                <img
                  src={article.urlToImage}
                  alt=""
                  className={styles.newsImg}
                />
                <p className={styles.newsText}>{article.title}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
};
