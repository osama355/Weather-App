import React, { useState } from "react";
import "./Styling/styles.css";

const App = () => {
  const key = "be8b8154c09445604677fb33d66a8eb2";
  const base = "https://api.openweathermap.org/data/2.5/";

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${date} ${month}, ${year}`;
  };

  const search = async (evt) => {
    if (evt.key === "Enter") {
      const response = await fetch(
        `${base}weather?q=${query}&units=metric&APPID=${key}`
      );
      const data = await response.json();
      setWeather(data);
      setQuery("");
      console.log("Data Here", data);
    }
  };

  return (
    <div className="app hot">
      <div className="main">
        <div className="search_box">
          <input
            type="text"
            className="search_bar"
            placeholder="Search Weather..."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="weather_info">
            <div className="location_box">
              <div className="weather">
                <p>{weather.weather[0].main}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
              <div className="location">
                {weather.name},{weather.sys.country}{" "}
              </div>
              <div className="date"> {dateBuilder(new Date())} </div>
            </div>
            <div className="weather_box">
              <div className="temperature">
                <h1>{Math.round(weather.main.temp)}°C </h1>
              </div>
              <div className="feels">
                {" "}
                <p>Feel Like</p>{" "}
                <h1>{Math.round(weather.main.feels_like)}°C</h1>{" "}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
