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

    const handleDeleteTrip = async (id : string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this trip?"
        )
        if(!confirmed) return;
        const response = await fetch(`http://localhost:5000/api/trips/${id}`, {
            method: "DELETE",
        })
        if (response.ok) {
            setTrips(trips.filter((trip) => trip._id !== id));
        } else {
            console.error("Failed to delete trip");
        }
    }
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
                    <button className="rounded-lg bg-blue-500 text-white px-4 py-2" type="button" onClick={() => setSelectedTrip(trip)}>
                        view plan
                    </button>
                    <p>startDate: {new Date(trip.startDate).toLocaleDateString()}</p>
                    <p>endDate: {new Date(trip.endDate).toLocaleDateString()}</p>
                    <button type="button" className="rounded-lg bg-red-500 text-white px-4 py-2" onClick={() => handleDeleteTrip(trip._id)}>Delete</button>
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