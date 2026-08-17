import type { Trip } from "../types/trips";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
function MyTrips() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

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
                    <button type="button" onClick={() => setSelectedTrip(trip)}>
                        view plan
                    </button>
                    <p>startDate: {new Date(trip.startDate).toLocaleDateString()}</p>
                    <p>endDate: {new Date(trip.endDate).toLocaleDateString()}</p>
                </div>
             ))}
             </div>
             {selectedTrip && (
        <div className="mt-8 rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">
        {selectedTrip.destination} - Trip Plan
         </h2>

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {selectedTrip.generatedPlan}
        </ReactMarkdown>
        </div>
        )}
        </div>
    )
}

export default MyTrips