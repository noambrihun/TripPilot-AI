import type { Trip } from "../types/trips";
import { useState, useEffect } from "react";
function MyTrips() {
    const [trips, setTrips] = useState<Trip[]>([]);

    useEffect(() => {
        const fetchTrips = async () => {
            const response = await fetch("http://localhost:5000/api/trips");
            const data = await response.json();
            console.log(data);
            setTrips(data);

        }
        fetchTrips();

    }, []);
    return (
        <div className="p-4 bg-gray-100">
            <h1 className="text-3xl font-bold underline">My Trips</h1>
            <div className="grid grid-4 gap-4 p-4">
             {trips.map((trip) => (
                <div key={trip._id} className="bg-white p-4 rounded-lg shadow-md">
                    <h2>{trip.destination}</h2>
                    <p>Budget: {trip.budget}</p>
                    <p>Travelers: {trip.travelers}</p>
                    <p>Interests: {trip.interests.join(", ")}</p>
                    <p>startDate: {new Date(trip.startDate).toLocaleDateString()}</p>
                    <p>endDate: {new Date(trip.endDate).toLocaleDateString()}</p>
                </div>
             ))}
             </div>
        </div>
    )
}

export default MyTrips