import { useState, useEffect, useRef } from "react";
import { fetchHourlyForecast } from "../../../../services/weatherService.js";
import { Container } from "../../../../components/Container/Container.jsx";
import style from "./HourlyForecast.module.scss";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export const HourlyForecast = ({ cityName, isActive }) => {
  const [hourlyData, setHourlyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!cityName || !isActive) return;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchHourlyForecast(cityName);

        let pointsToShow = 20;
        if (window.innerWidth < 768) pointsToShow = 3;
        else if (window.innerWidth < 1200) pointsToShow = 8;

        const hours = data.list.slice(0, pointsToShow).map((item) => {
          const date = new Date(item.dt * 1000);
          const hours = date.getHours();
          return hours === 0
            ? "12 am"
            : hours < 12
            ? `${hours} am`
            : hours === 12
            ? "12 pm"
            : `${hours - 12} pm`;
        });

        const temps = data.list
          .slice(0, pointsToShow)
          .map((item) => Math.round(item.main.temp));

        setHourlyData({ hours, temps });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const handleResize = () => {
      fetchData();
    };

    window.addEventListener("resize", handleResize);
    fetchData();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cityName, isActive]);

  useEffect(() => {
    if (!hourlyData || !chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const minTemp = Math.min(...hourlyData.temps);

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
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: "category",
            position: "top",
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
              drawTicks: false,
            },
            ticks: {
              color: "#000",
              font: {
                family: "Montserrat",
                size: window.innerWidth < 1200 ? 10 : 11,
                weight: 500,
                style: "normal",
              },
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
              padding: 10,
              callback: (value, index, ticks) => {
                return hourlyData.hours[index];
              },
            },
          },

          y: {
            position: "left",
            min: Math.min(0, roundedMin - 5),
            max: Math.max(30, roundedMax + 5),
            grid: {
              color: (ctx) => {
                const value = ctx.tick.value;
                if (Math.abs(value - 0) < 0.1 || Math.abs(value - 30) < 0.1) {
                  return "transparent";
                }
                return "rgba(0, 0, 0, 0.1)";
              },
              lineWidth: (ctx) => {
                const value = ctx.tick.value;
                if (Math.abs(value - 0) < 0.1 || Math.abs(value - 30) < 0.1) {
                  return 0;
                }
                return 1;
              },
            },
            ticks: {
              color: "#000",
              font: {
                family: "Montserrat",
                size: window.innerWidth < 1200 ? 10 : 11,
                weight: 500,
                style: "normal",
              },
              crossAlign: "far",
              stepSize: 5,
              callback: (value) => {
                if ([5, 10, 15, 20, 25].includes(value)) {
                  return `${value}°C`;
                }
                return "";
              },
            },
          },
        },
        layout: {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
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
    <section className={style.hourlyForecast}>
      <Container>
        <div className={style.hourlyForecast__box}>
          <h2 className={style.hourlyForecast__title}>Hourly forecast</h2>
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
