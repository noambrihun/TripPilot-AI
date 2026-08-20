import type { Trip } from "../types/trips";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
function MyTrips() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
    const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

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
    const handleSaveEdit = async () => {
        const response = await fetch(`http://localhost:5000/api/trips/${editingTrip._id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editingTrip),
        })
        if(!response.ok){
            throw new Error("Failed to update trip");
        }
        const updatedTrip = await response.json();
        setTrips(trips.map((trip) => trip._id === editingTrip._id ? updatedTrip : trip));
        setEditingTrip(null);
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
                    <button type="button" className="rounded-lg bg-yellow-500 text-white px-4 py-2" onClick={() => setEditingTrip(trip)}>Edit</button>
                    <p>startDate: {new Date(trip.startDate).toLocaleDateString()}</p>
                    <p>endDate: {new Date(trip.endDate).toLocaleDateString()}</p>
                    <button type="button" className="rounded-lg bg-red-500 text-white px-4 py-2" onClick={() => handleDeleteTrip(trip._id)}>Delete</button>
                </div>
             ))}
             </div>
             {selectedTrip && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 relative">
                <button type="button"
                className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center top-4 right-4 hover:bg-red-600 absolute"
                 onClick={() => setSelectedTrip(null)}>
                    X
                </button>
        <h2 className="mb-4 text-2xl font-bold">
        {selectedTrip.destination} - Trip Plan
         </h2>

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {selectedTrip.generatedPlan}
        </ReactMarkdown>
        </div>
        </div>
        )}
        {editingTrip && (
            <div>
                <h2>Edit Trip</h2>
                <input
                type="text"
                value={editingTrip.destination}
                onChange={(e) => setEditingTrip({...editingTrip, destination: e.target.value})}
                 />
                 <input
                 type="number"
                 value={editingTrip.budget}
                 onChange={(e) => setEditingTrip({...editingTrip, budget: Number(e.target.value)})}
                 />
                 <input
                 type="number"
                 value={editingTrip.travelers}
                 onChange={(e) => setEditingTrip({...editingTrip, travelers: Number(e.target.value)})}
                 />
                 <input
                 type="text"
                 value={editingTrip.interests.join(",")}
                 onChange={(e) => setEditingTrip({...editingTrip, interests: e.target.value.split(",").map((item) => item.trim())})}
                 />
                 <input 
                 type="text"
                 value={editingTrip.notes}
                 onChange={(e) => setEditingTrip({...editingTrip, notes: e.target.value})}
                 />
                 <button type="button" className="rounded-lg bg-green-500 text-white px-4 py-2" onClick={handleSaveEdit}>Save</button>
            </div>
        )}
        </div>
    )
}

export default MyTrips