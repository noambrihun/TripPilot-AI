function GenerateTrips() {
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
  
  <form className="rounded-xl bg-white p-6 shadow-md">
    <div>
        <label htmlFor="destination" className="block mb-2 font-medium">
            Destination
        </label>
        <input
        id="destination"
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
    type="text"
    placeholder="e.g. History, Culture, Food"
    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />

</div>
<div>
    <label htmlFor="notes" className="mb-2 block font-medium">
        Additional Notes
    </label>
    <textarea
    id="notes"
    placeholder="e.g. I have a food allergy, I'm a vegetarian"
    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    rows={4}
    />
</div>
<button type="submit" className="w-full mt-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
    Generate Plan
</button>

          </form>
        </div>
      </main>
    )
}

export default GenerateTrips