import iller from "./data/iller.json";
import "./styles.css";
import { DataProvider } from "./context/Context";
import Container from "./components/Container";
import {DataContext} from "./context/Context"
import { useContext } from "react";
function App() {
    const {setIl, weatherData} = useContext(DataContext)
    
    let list = iller.map((il) => <option key={il.plaka}>{il.il_adi}</option>);
    const handleChange = (sf) => {
        if (sf) {
            setIl(sf);
        }
    };
    console.log("weatherdatalist", weatherData?.list);

    return (
        <DataProvider>
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

                <Container />
            </div>
        </DataProvider>
    );
}
export default App;
