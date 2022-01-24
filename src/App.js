import * as React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { WeatherDay } from "./WeatherDay/WeatherDay";

const App = () => {
  const [weatherInfo, setWeatherInfo] = useState([]);
  const apiKey = "dd3fa4fa36e54e6d8ee192356221301";

  const sFetch = (location) => {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=10&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) =>
        setWeatherInfo(
          data.forecast.forecastday.map((df) => {
            return {
              date: df.date,
              avgTemp: df.day.avgtemp_c,
              condition: df.day.condition.text,
              image: df.day.condition.icon,
            };
          })
        )
      );

    let els = document.getElementsByClassName("heading active");
    for (let i = 0; i < els.length; i++) {
      els[0].classList.remove("active");
    }
    let locationLink = document.getElementById(location);
    locationLink.classList.add("active");
  };

  useEffect(() => {
    sFetch("Kitchener");
  }, []);

  console.log(weatherInfo[0]);
  const currentDay = weatherInfo;
  console.log(currentDay);

  return (
    <div claaName="App">
      <div className="menu" id="menuNav">
        <a
          href="#"
          id="Kitchener"
          className="heading"
          onClick={() => sFetch("Kitchener")}
        >
          KITCHENER
        </a>
        <a
          href="#"
          id="Miami"
          className="heading"
          onClick={() => sFetch("Miami")}
        >
          MIAMI
        </a>
        <a
          href="#"
          id="Maldives"
          className="heading"
          onClick={() => sFetch("Maldives")}
        >
          MALDIVES
        </a>
      </div>

      <Box sx={{ flexGrow: 1 }} className="cWeather">
        <Grid container className="box">
          {weatherInfo.map((i, index) => {
            if (index === 0) {
              return (
                <Grid item xs={12} key={index} className="current">
                  <WeatherDay
                    date={i.date}
                    avgTemp={i.avgTemp}
                    condition={i.condition}
                    image={i.image}
                  />
                </Grid>
              );
            } else {
              return (
                <Grid item xs={3} key={index} className="forecast">
                  <WeatherDay
                    date={i.date}
                    avgTemp={i.avgTemp}
                    condition=""
                    image={i.image}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default App;
