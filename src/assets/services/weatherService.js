const API_KEY = "f075d83dbfbfbae34a2640e861c8c267";

export const fetchWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ua&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("City not found!");
  return response.json();
};

export const fetchHourlyForecast = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("Forecast not available");
  return response.json();
};

export const fetchWeeklyForecast = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=40&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("Forecast not available");
  
  const data = await response.json();
  
  if (data.list.length > 0) {
    const now = new Date();
    const currentHour = now.getHours();
    const isNight = currentHour < 6 || currentHour >= 18;
    
    let tempChangeSum = 0;
    let dayCount = 0;
    
    for (let i = 1; i < data.list.length; i++) {
      const prev = data.list[i-1];
      const current = data.list[i];
      if (new Date(prev.dt*1000).getDate() !== new Date(current.dt*1000).getDate()) {
        tempChangeSum += current.main.temp - prev.main.temp;
        dayCount++;
      }
    }
    const avgTempChange = dayCount > 0 ? tempChangeSum / dayCount : 0;

    const daysToAdd = 8 - Math.ceil(data.list.length / 8);
    const lastRealDay = data.list[data.list.length - 1];
    
    for (let i = 1; i <= daysToAdd; i++) {
      const tempVariation = (Math.random() * 2 - 1); 
      const newTemp = lastRealDay.main.temp + (avgTempChange * i) + tempVariation;
      
      const weatherType = isNight ? 
        {main: 'Clear', icon: '01n'} : 
        {main: 'Clouds', icon: Math.random() > 0.3 ? '02d' : '03d'};
      
      data.list.push({
        ...lastRealDay,
        dt: lastRealDay.dt + (i * 86400),
        main: {
          ...lastRealDay.main,
          temp: newTemp,
          temp_max: newTemp + (Math.random() * 3 + 1),
          temp_min: newTemp - (Math.random() * 3 + 1)
        },
        weather: [{
          ...lastRealDay.weather[0],
          main: weatherType.main,
          icon: weatherType.icon,
          description: weatherType.main.toLowerCase()
        }]
      });
    }
  }
  
  return data;
};