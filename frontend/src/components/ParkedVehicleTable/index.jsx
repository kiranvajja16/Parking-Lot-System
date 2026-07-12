import { useEffect, useState } from "react";
import { getParkedVehicles } from "../../services/api";
import "./index.css";

const ParkedVehicleTable = ({ refresh }) => {

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetchVehicles();
    }, [refresh]);

    const fetchVehicles = async () => {
        try {
            const response = await getParkedVehicles();

            setVehicles(response.data.vehicles);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="table-container">

            <h2>Currently Parked Vehicles</h2>

            <table>

                <thead>

                    <tr>
                        <th>Ticket ID</th>
                        <th>Vehicle Number</th>
                        <th>Vehicle Type</th>
                        <th>Entry Time</th>
                    </tr>

                </thead>

                <tbody>

{
    vehicles.length === 0 ?

    (
        <tr>
            <td colSpan="4" className="no-data">
                 No Vehicles Parked
            </td>
        </tr>
    )

    :

    vehicles.map(vehicle=>(

        <tr key={vehicle.ticketId}>

            <td>{vehicle.ticketId}</td>

            <td>{vehicle.vehicleNumber}</td>

            <td>

                {
                    vehicle.vehicleType==="bike"
                    ? " Bike"

                    : vehicle.vehicleType==="car"
                    ? " Car"

                    : " Truck"
                }

            </td>

            <td>

                {
                    new Date(vehicle.entryTime)
                    .toLocaleString()
                }

            </td>

        </tr>

    ))

}

</tbody>

            </table>

        </div>
    );
};

export default ParkedVehicleTable;