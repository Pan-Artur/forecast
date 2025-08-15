import { useState, useEffect } from "react";
import { Container } from "../../../components/Container/Container";
import styles from "./Pets.module.scss";

export const Pets = ({ keyword }) => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "error") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, fading: true }
          : notification
      )
    );

    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, 500);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(null);
      setNews(null);
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
          throw new Error("Failed to load news. The server might be overloaded. Go touch some grass while we try to fix this.");
        }

        const data = await response.json();

        if (data.articles.length === 0) {
          throw new Error("No news found for your search. Try a different keyword or go touch some grass.");
        }

        setNews(data);
      } catch (err) {
        setError(err.message);
        addNotification(err.message);
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
          <div className={styles.news__notifications}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.news__notification} ${
                  styles[notification.type]
                } ${
                  notification.fading
                    ? styles["news__notification--fading"]
                    : ""
                }`}
                onClick={() => removeNotification(notification.id)}
              >
                {notification.message}
              </div>
            ))}
          </div>
          {loading ? (
            <div className={styles.news__loading}>Loading news...</div>
          ) : error ? (
            <div className={styles.news__error}>
              <p>{error}</p>
              <p>Server might be overloaded. Go touch some grass.</p>
            </div>
          ) : (
            <ul className={styles.newsList}>
              {news?.articles?.map((article) => (
                <li key={article.url} className={styles.newsItem}>
                  <img
                    src={article.urlToImage}
                    alt=""
                    className={styles.newsImg}
                  />
                  <p className={styles.newsText}>{article.title}</p>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
};