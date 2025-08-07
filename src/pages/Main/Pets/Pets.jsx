import { useState, useEffect } from "react";
import { Container } from "../../../components/Container/Container";

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
        } else{
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

  // const formatDate = () => {
  //   const date = new Date();
  //   const year = date.toLocaleDateString("uk-UA", {
  //     year: "numeric",
  //   });
  //   const month = date.toLocaleDateString("uk-UA", {
  //     month: "numeric",
  //   });
  //   const day = date.toLocaleDateString("uk-UA", {
  //     day: "numeric",
  //   });

  //   const sevenDaysAgo = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));

  //   console.log(formatDate(sevenDaysAgo));

  //   return `${year}-${month}-${day}`;
  // };
  return <>
    <section className="pets">
      <Container>
        <h2 className="newsTitle">News</h2>
        <ul className="newsList">
          {news?.articles?.map(article => (
            <li className="newsItem">
              <img src={article.urlToImage} alt="" className="newsImg" />
              <p className="newsText">{article.content}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  </>;
};
