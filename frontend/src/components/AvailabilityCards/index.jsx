import { useEffect, useState } from "react";
import { getSlots } from "../../services/api";
import "./index.css";

const AvailabilityCards = ({ refresh }) => {
  const [slots, setSlots] = useState({
    bike: { total: 0, available: 0 },
    car: { total: 0, available: 0 },
    truck: { total: 0, available: 0 },
  });

  useEffect(() => {
    fetchSlots();
  }, [refresh]);

  const fetchSlots = async () => {
    try {
      const response = await getSlots();

     
      if (response.data.success) {
        setSlots(response.data.slots);
      }

    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cards-container">

      <div className="card bike">
        <h2> Bikes</h2>
        <p>{slots.bike.available}</p>

        <span>Available of {slots.bike.total}</span>
      </div>

      <div className="card car">
        <h2> Cars</h2>
        <p>{slots.car.available}</p>

        <span>Available of {slots.car.total}</span>
      </div>

      <div className="card truck">
        <h2> Trucks</h2>
        <p>{slots.truck.available}</p>

        <span>Available of {slots.truck.total}</span>
      </div>

    </div>
  );
};

export default AvailabilityCards;