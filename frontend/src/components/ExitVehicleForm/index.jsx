import { useState } from "react";
import { exitVehicle } from "../../services/api";
import "./index.css";

const ExitVehicleForm = ({ refreshData }) => {
  const [ticketId, setTicketId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {};

      if (ticketId) {
        body.ticketId = ticketId;
      } else {
        body.vehicleNumber = vehicleNumber;
      }

      const response = await exitVehicle(body);

      setReceipt(response.data.receipt);
      refreshData();
      setMessage("");

      setTicketId("");
      setVehicleNumber("");
    } catch (error) {
      setReceipt(null);
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="exit-form">

      <h2>Exit Vehicle</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
        />

        <p>OR</p>

        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />

        <button type="submit">
          Exit Vehicle
        </button>

      </form>

      {message && (
        <p className="error">{message}</p>
      )}

      {receipt && (
    <div className="receipt">

        <h3> Parking Receipt</h3>

        <p>
            <span>Ticket ID</span>
            <span>{receipt.ticketId}</span>
        </p>

        <p>
            <span>Vehicle</span>
            <span>{receipt.vehicleNumber}</span>
        </p>

        <p>
            <span>Vehicle Type</span>
            <span>{receipt.vehicleType}</span>
        </p>

        <p>
            <span>Duration</span>
            <span>{receipt.durationHours} Hours</span>
        </p>

        <p>
            <span>Amount</span>
            <span>₹{receipt.amount}</span>
        </p>

    </div>
)}

    </div>
  );
};

export default ExitVehicleForm;