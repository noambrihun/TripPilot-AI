import { useParams } from 'react-router-dom';
import { useEffect, useState }  from 'react';
import type { Trip } from '../types/trips';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
function TripDetails() {
    const [trip, setTrip] = useState<Trip | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchTrip = async () => {
            const response = await fetch(`http://localhost:5000/api/trips/${id}` );
            const data = await response.json();
            setTrip(data);
        }
        fetchTrip();
    }, [id]);
    
    return (
        <div className='p-4 bg-gray-100'>
            <h1 className='text-3xl font-bold mb-4'>Trip Details</h1>
            {trip && (
                <div className='max-w-5xl mx-auto p6'>
                    <h2 className='text-3xl font-bold mb-4'>{trip.destination}</h2>
                    <div className='bg-white rounded-xl shadow-md p-5 mb-6'>
                    <p>Budget: {trip.budget}</p>
                    <p>Travelers: {trip.travelers}</p>
                    <p>Interests: {trip.interests.join(", ")}</p>
                    <p>Start Date: {new Date(trip.startDate).toLocaleDateString()}</p>
                    <p>End Date: {new Date(trip.endDate).toLocaleDateString()}</p>
                    </div>
                    <div className='bg-white rounded-xl shadow-md p-6'>
                        <h2 className='text-xl font-bold mb-4'>Generated Plan</h2>
                    <ReactMarkdown rehypePlugins={[remarkGfm]}>
                        {trip.generatedPlan}
                    </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    )
}
export default TripDetails;