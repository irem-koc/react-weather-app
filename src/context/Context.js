import { createContext, useState, useEffect } from "react";
export const DataContext = createContext("");

export const DataProvider = ({ children }) => {
    const [il, setIl] = useState("İstanbul");
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        const fetchData = async (il) => {
            const api_key = "a06b36fc3a7407d6deebfca4bc6703d8";
            const url = `http://api.openweathermap.org/data/2.5/forecast?q=${il},TR&cnt=7&appid=${api_key}`;
            const response = await fetch(url);
            const data =  await response.json() 
            setWeatherData(data);
        }
        fetchData(il);
    }, [il]);
    const values = {
        weatherData,
        setWeatherData,
        il,
        setIl,
    };
    return (
        <DataContext.Provider value={values}>{children}</DataContext.Provider>
    );
};
