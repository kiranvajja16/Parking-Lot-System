import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
});


export const getSlots = () => api.get("/slots");

export const parkVehicle = (data) => api.post("/park", data);

export const exitVehicle = (data) => api.post("/exit", data);

export const getParkedVehicles = () => api.get("/parked");

export default api;