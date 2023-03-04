import React, {useContext} from "react";
import {DataContext} from "./../context/Context"

const Container = () => {
    const {il, weatherData} = useContext(DataContext)
    return (
        <div>
            {il ? (
                <div>
                    <h2>
                        7-Day Weather Forecast for{" "}
                        {il.charAt(0).toUpperCase() +
                            il?.slice(1).toLocaleLowerCase("tr")}
                    </h2>
                    <br />
                    <br />
                    <div className="seven-days">
                        {weatherData?.list.map((weather, i) => (
                            <div key={i} className="days">
                                <p>{weather?.dt_txt}</p>
                                <p>
                                    Temperature:{" "}
                                    {Math.round(weather.main.temp - 273.15)}
                                    °C
                                </p>
                                <p>Humidity: {weather.main.humidity}%</p>
                                <p>Wind speed: {weather.wind.speed} m/s</p>
                                <p>
                                    Description:{" "}
                                    {weather.weather[0].description}
                                </p>

                                <div>
                                    <img
                                        className="image"
                                        title={JSON.stringify(
                                            weather.weather[0].description
                                        )}
                                        src={
                                            "http://openweathermap.org/img/w/" +
                                            weather.weather[0].icon +
                                            ".png"
                                        }
                                        alt="Weather icon"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div style={{ margin: "auto" }}>
                    Select citation for weather data...
                </div>
            )}
        </div>
    );
};

export default Container;
