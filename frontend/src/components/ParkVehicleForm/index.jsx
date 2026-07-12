import { useState } from "react";
import { parkVehicle } from "../../services/api";
import "./index.css";

const ParkVehicleForm = ({ refreshData }) => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await parkVehicle({
        vehicleNumber,
        vehicleType,
      });

      setMessage(` ${response.data.ticket.ticketId} Generated`);

      setVehicleNumber("");
      refreshData();
      setVehicleType("car");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="park-form">

      <h2>Park Vehicle</h2>

      <form onSubmit={handleSubmit}>

    <input
        type="text"
        placeholder="Enter Vehicle Number"
        value={vehicleNumber}
        onChange={(e)=>setVehicleNumber(e.target.value)}
        required
    />

    <select
        value={vehicleType}
        onChange={(e)=>setVehicleType(e.target.value)}
    >
        <option value="bike"> Bike</option>
        <option value="car"> Car</option>
        <option value="truck"> Truck</option>
    </select>

    <button type="submit">
         Park Vehicle
    </button>

</form>

      {message && (
        <p className="message">{message}</p>
      )}

    </div>
  );
};

export default ParkVehicleForm;