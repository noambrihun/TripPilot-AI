import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router-dom";
import.meta.env.VITE_API_URL;
function GenerateTrips() {
  const[tripPlan, setTripPlan] = useState("");
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");
  const[success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: "",
    interests: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const tripData = {
      ...formData,
      budget: Number(formData.budget),
      travelers: Number(formData.travelers),
      interests: formData.interests.split(",").map((item) => item.trim()),
    }
    console.log(tripData);

    try{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    })
    if (!response.ok) {
      throw new Error("Failed to generate trip plan. Please try again.");
    }
  const data = await response.json();
  setTripPlan(data.generatedPlan);
  } catch (error) {
    console.error(error);
    setError("Failed to generate trip plan. Please try again.");
  } finally {
    setLoading(false);
  }
};

const handleSaveTrip = async () => {
  setLoading(true);
    setError("");
    const saveTripData = {
      ...formData,
      budget: Number(formData.budget),
      travelers: Number(formData.travelers),
      interests: formData.interests.split(",").map((item) => item.trim()),
      notes: formData.notes,
      generatedPlan: tripPlan,
    }
  try{
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`,{
    method: "POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify(saveTripData),
  })
  if (!response.ok) {
  throw new Error("Failed to save trip plan. Please try again.");
}
const data = await response.json();
console.log(data);
navigate("/my-trips"); 
setSuccess("Trip plan saved successfully.");
} catch(error){
  console.error(error);
  setError("Failed to save trip plan. Please try again.");
} finally {
  setLoading(false);
}
}

    return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
    <div className="mx-auto max-w-3xl">
    <div className="mb-8 text-center">
    <h1 className="text-3xl font-bold">
          Plan Your Trip with AI
   </h1>
  
   <p className="mt-2 text-gray-600">
   Tell us about your trip and we'll create a personalized plan for you.
   </p>
   </div>
  
  <form onSubmit={handleSubmit} className="rounded-xl bg-white p-6 shadow-md">
    <div>
        <label htmlFor="destination" className="block mb-2 font-medium">
            Destination
        </label>
        <input
        id="destination"
        value={formData.destination}
        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
        type="text"
        placeholder="e.g. Berlin, Germany"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
    </div>
  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>
    <label htmlFor="startDate" className="mb-2 block font-medium">
      Start Date
    </label>

    <input
      id="startDate"
      value={formData.startDate}
      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
      type="date"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  </div>

  <div>
    <label htmlFor="endDate" className="mb-2 block font-medium">
      End Date
    </label>

    <input
      id="endDate"
      value={formData.endDate}
      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
      type="date"
      className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />
  </div>
</div>
<div className="mt-5 grid gris-cols-1 gap-4 md:grid-cols-2">
    <div>
        <label htmlFor="budget" className="mb-2 block font-medium">
            Budget
        </label>
        <input
        id="budget"
        value={formData.budget}
        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        type="number"
        placeholder="e.g. 1000"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
    </div>
    <div>
        <label htmlFor="travelers" className="mb-2 block font-medium">
            Number of Travelers

        </label>
        <input  
        id="travelers"
        value={formData.travelers}
        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
        type="number"
        placeholder="e.g. 1, 2, 3"
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
    </div>

</div>
<div>
    <label htmlFor="interests" className="mb-2 block font-medium">
        Interests
    </label>
    <input
    id="interests"
    value={formData.interests}
    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
    type="text"
    placeholder="e.g. History, Culture, Food"
    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />

</div>
<div>
    <label htmlFor="notes" className="mb-2 block font-medium">
        Add Notes
    </label>
    <textarea
    id="notes"
    placeholder="e.g. I have a food allergy, I'm a vegetarian"
    value={formData.notes}
    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    rows={4}
    />
</div>
<button type="submit" disabled={loading} className="w-full mt-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
    {loading ? "Generating..." : "Generate Plan"}
</button>

          </form>
          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
              {error}
            </div>
          )}
          {tripPlan && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Your Trip Plan</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {tripPlan}
            </ReactMarkdown>
            <button onClick={handleSaveTrip} type="button" className="mt-6 w-full rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700">
          {loading ? "Saving..." : "Save Plan"}
        </button>
        {success && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-3 text-green-700">
         {success}
       </div>
)}
          </div>
        )}
        </div>
       
      </main>
      
    
    )
}

export default GenerateTrips