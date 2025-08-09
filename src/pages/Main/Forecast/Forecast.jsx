import { useState, useEffect, useRef } from "react";
import { fetchHourlyForecast } from "../../../assets/services/weatherService.js";
import { Container } from "../../../components/Container/Container.jsx";
import style from "./Forecast.module.scss";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export const Forecast = ({ cityName, showHourlyForecast }) => {
  const [hourlyData, setHourlyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!cityName || !showHourlyForecast) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchHourlyForecast(cityName);

        const hours = data.list.slice(0, 20).map((item) => {
          const date = new Date(item.dt * 1000);
          const hours = date.getHours();
          return hours === 0
            ? "12am"
            : hours < 12
            ? `${hours}am`
            : hours === 12
            ? "12pm"
            : `${hours - 12}pm`;
        });

        const temps = data.list
          .slice(0, 20)
          .map((item) => Math.round(item.main.temp));

        setHourlyData({ hours, temps });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityName, showHourlyForecast]);

  useEffect(() => {
    if (!hourlyData || !chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const minTemp = Math.min(...hourlyData.temps);
    const maxTemp = Math.max(...hourlyData.temps);

    const roundedMin = Math.max(5, Math.floor(minTemp / 5) * 5);
    const roundedMax = 25;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: hourlyData.hours,
        datasets: [
          {
            label: "",
            data: hourlyData.temps,
            backgroundColor: "rgba(255, 255, 255, 0)",
            borderColor: "#FFB36C",
            borderWidth: 2,
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            position: "top",
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
              drawTicks: false,
            },
            ticks: {
              color: "#666",
              autoSkip: false,
              maxRotation: 0,
              font: {
                size: 12,
              },
              callback: function (val, index) {
                return hourlyData.hours[index];
              },
            },
          },
          y: {
            position: "left",
            min: roundedMin - 5,
            max: roundedMax + 5,
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
              lineWidth: 1,
              tickLength: 70,
            },
            ticks: {
              stepSize: 5,
              count: 5,
              callback: (value) => {
                if (value === 0 || value === 30) return "";
                return `${value}°C`;
              },
              color: "#666",
            },
          },
        },
        layout: {
          padding: {
            top: 60,
            bottom: 40,
            left: 30,
            right: 20,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [hourlyData]);

  return (
    <section className={style.forecast__section}>
      <Container>
        <div className={style.forecast__box}>
          <h2 className={style.forecast__title}>Hourly forecast</h2>
          <div className={style.chart__container}>
            <canvas
              ref={chartRef}
              aria-label="Hourly temperature chart"
              role="img"
            ></canvas>
          </div>
        </div>
      </Container>
    </section>
  );
};
