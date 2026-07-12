import { useState } from "react";

import AvailabilityCards from "./components/AvailabilityCards";
import ParkVehicleForm from "./components/ParkVehicleForm";
import ExitVehicleForm from "./components/ExitVehicleForm";
import ParkedVehicleTable from "./components/ParkedVehicleTable";

import "./App.css";

function App() {

    const [refresh, setRefresh] = useState(false);

    const refreshData = () => {
        setRefresh(prev => !prev);
    };

    return (
        <div className="app">

            <h1>Parking Lot System</h1>

            <AvailabilityCards refresh={refresh} />

            <div className="forms-container">

            <ParkVehicleForm refreshData={refreshData} />

            <ExitVehicleForm refreshData={refreshData} />

            </div>
            <ParkedVehicleTable refresh={refresh} />

        </div>
    );
}

export default App;