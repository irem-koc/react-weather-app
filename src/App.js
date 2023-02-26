import { useEffect, useState } from "react";
import axios from "axios";
import iller from "./data/iller.json";
import "./styles.css";
function App() {
    const [il, setIl] = useState();
    const [weatherData, setWeatherData] = useState(null);
    const [weatherdataList, setWeatherDataList] = useState();
    const fetchData = async (il) => {
        const api_key = "a06b36fc3a7407d6deebfca4bc6703d8";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${il},TR&appid=${api_key}`;
        const response = await axios.get(url);
        setWeatherData(response.data);
        const url2 = `http://api.openweathermap.org/data/2.5/forecast?q=${il},TR&cnt=7&appid=${api_key}`;
        const response2 = await axios.get(url2);
        setWeatherDataList(response2.data);
    };
    let list = iller.map((il) => <option key={il.plaka}>{il.il_adi}</option>);
    useEffect(() => {
        fetchData(il);
    }, [il]);
    const handleChange = (sf) => {
        if (sf) {
            fetchData(sf);
            setIl(sf);
        }
    };
    console.log("weatherdatalist", weatherdataList?.list);

    return (
        <div className="App">
            <div className="select-section">
                <select
                    onChange={(e) => handleChange(e.target.value)}
                    name="iller"
                >
                    <option value="none" selected disabled hidden />
                    {list}
                </select>
            </div>

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
                        {weatherdataList?.list.map((weather, i) => (
                            <div key={i} className="days">
                                <p>{weather?.dt_txt}</p>
                                <p>
                                    Temperature:{" "}
                                    {Math.round(weather.main.temp - 273.15)}°C
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
}
export default App;
