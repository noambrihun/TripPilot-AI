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
    currency: "USD",
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
    <main className="min-h-screen bg-slate-50 px-6 py-14">
    <div className="mx-auto max-w-4xl">
    <div className="mb-8 text-center">
      <p className="mb-2 text-sm font-semibold text-blue-600">
          AI TRIP PLANNER
      </p>
    <h1 className="text-4xl font-bold text-slate-900">
          Plan Your Trip with AI
   </h1>
  
   <p className="mt-3 text-base text-slate-600">
   Tell us about your trip and we'll create a personalized plan for you.
   </p>
   </div>
  
  <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-lg border border-slate-200">
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
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
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
      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
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
      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
    />
  </div>
</div>
<div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
    <div>
        <label htmlFor="budget" className="mb-2 block font-medium">
            Budget
        </label>
        <div className="flex gap-2">
        <select
        id="currency"
        value={formData.currency}
        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
        className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        >
          <option value="USD">$ USD</option>
          <option value="ILS">₪ ILS</option>
          <option value="EUR">€ EUR</option>
        </select>
        <input
        id="budget"
        value={formData.budget}
        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        type="number"
        min="1"
        placeholder="e.g. 1000"
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
        </div>
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
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
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
    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
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
    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
    rows={4}
    />
</div>
<button type="submit" disabled={loading} className="w-full mt-5 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed">
    {loading ? "Generating..." : "Generate Plan"}
</button>

          </form>
          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
              {error}
            </div>
          )}
          {tripPlan && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg border border-slate-200">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Your Trip Plan</h2>
            <div className="prose prose-slate max-w-none">
            <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
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
  }}
>
  {tripPlan}
</ReactMarkdown>
            </div>
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