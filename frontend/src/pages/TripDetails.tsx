import { useParams } from 'react-router-dom';
import { useEffect, useState }  from 'react';
import type { Trip } from '../types/trips';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
function TripDetails() {
    const [trip, setTrip] = useState<Trip | null>(null);
    const { id } = useParams();
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState<string | null>(null);

    
        
        const fetchTrip = async () => {
            setLoading(true);
            setError(null);
            try{
            const response = await fetch(`http://localhost:5000/api/trips/${id}` );
            if(!response.ok){
                throw new Error('Failed to fetch trip');
            }
            const data = await response.json();
            setTrip(data);
        }catch(error){
            console.error('Error fetching trip:', error);
            setError('Failed to fetch trip');
        }finally{
            setLoading(false);
        }
        }
        
        useEffect(() => {
            fetchTrip();
        }, [id]);
     
        if (loading) {
            return <p>Loading trip...</p>;
          }
          if (error) {
            return (
              <div className="max-w-xl mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
                <h2 className="text-xl font-bold text-red-600 mb-2">
                  Something went wrong
                </h2>
          
                <p className="text-red-500">
                  {error}
                </p>
              </div>
            );
          }
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