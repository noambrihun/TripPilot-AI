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
          if (!trip) {
            return <p>Trip not found</p>;
          }
          const sections = trip.generatedPlan.split(/(?=## Day \d+)/);
          console.log(sections);
          const [intro, ...days] = sections;
          const markdownComponents = {
            
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-2xl font-bold text-slate-900">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-xl font-semibold text-slate-800">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-slate-700">
        {children}
      </p>
    ),
    strong: ({ children }) => (
        <strong className="font-semibold text-slate-900">
          {children}
        </strong>
      ),
      
      ul: ({ children }) => (
        <ul className="mb-4 ml-6 list-disc space-y-2 text-slate-700">
          {children}
        </ul>
      ),
      
      li: ({ children }) => (
        <li className="leading-relaxed">
          {children}
        </li>
      )
          };
    return (
        <>
            <main>
            {trip && trip.imagesUrls?.[0] && (
      <section
      className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{
      backgroundImage: `url(${trip.imagesUrls[0]})`,
      }}
    >
     <div className="absolute inset-0 bg-black/40"></div>

    <div className="relative z-10 text-center text-white">
      <h1 className="text-5xl font-bold">
        {trip.destination}
      </h1>
      <p className="text-xl font-semibold mt-2 text-slate-200">
        {trip.interests.join(", ")}
        </p>
    </div>
   </section>
)}
   <section className="py-8 px-6">
   <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

    <div>
        <p className="text-sm text-slate-500">Budget</p>
        <p className="text-lg font-semibold text-slate-900">
          {trip.budget}
        </p>
    </div>

     <div>
        <p className="text-sm text-slate-500">Travelers</p>
        <p className="text-lg font-semibold text-slate-900">
          {trip.travelers}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Interests</p>
        <p className="text-lg font-semibold text-slate-900">
          {trip.interests.join(", ")}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Dates</p>
        <p className="text-lg font-semibold text-slate-900">
          {new Date(trip.startDate).toLocaleDateString()}
          {" - "}
          {new Date(trip.endDate).toLocaleDateString()}
        </p>
      </div>

     </div>
     </div>
    </section>
    {trip.imagesUrls && trip.imagesUrls.length > 1 && (
    <section className="px-6 pb-10">
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {trip.imagesUrls.slice(1, 5).map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`${trip.destination} ${index + 2}`}
          className="w-full h-56 object-cover rounded-xl shadow-sm"
        />
      ))}
    </div>
  </section>
   )}
  <section className="px-6 pb-16">
    <div className="max-w-6xl mx-auto">
    <div className="mb-8">
      <p className="text-sm font-semibold text-blue-600 mb-2">
        YOUR ITINERARY
      </p>

      <h2 className="text-4xl font-bold text-slate-900">
        Generated Plan
      </h2>
    </div>

    <div className="bg-white rounded-2xl shadow-md p-8">
    <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={markdownComponents}>
  {intro}
</ReactMarkdown>
     </div>
     <div className="space-y-6 mt-6">
  {days.map((day, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl shadow-md p-8"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {day}
      </ReactMarkdown>
    </div>
  ))}
</div>
     </div>
     </section>
     </main>
        </>
    )
}
export default TripDetails;