import { Link } from "react-router-dom";
import heroCoast from "../assets/hero-coast.jpg";
import natureTrip from "../assets/nature-trip.jpg";
function Home() {
    return (
        <>
    <main>
    <section 
     className="relative min-h-[calc(100svh-7rem)] md:min-h-[70vh] flex items-center justify-center px-6 py-14 md:py-0 bg-cover bg-center" 
     style={{backgroundImage: `url(${heroCoast})`}}
    >
    <div className="absolute inset-0 bg-black/45"></div>
      <div className="relative z-10 max-w-3xl text-center">
        <p className="text-blue-300 font-semibold mb-3 md:mb-4 text-sm md:text-base">AI-Powered Travel Planning</p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
          Plan your perfect trip with AI
        </h1>

        <p className="text-base md:text-lg text-gray-200 mb-6 md:mb-8">
          Create personalized travel plans based on your
          destination, budget and interests.
        </p>

        <Link to="/generate-trips" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-l-lg  hover:bg-blue-700 transition">
          Plan My Trip
        </Link>
      </div>
    </section>
    <section className="py-20 px-6">
       <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
        <img src={natureTrip} alt="mountain-landscape" className="rounded-lg shadow-lg" />
        </div>
        <div className="w-full md:w-1/2">
        <p className="text-blue-600 font-semibold mb-3">
            personalized for you
        </p>
        <h2 className="text-4xl font-bold mb-5">
            trip built around what you love
        </h2>

      <p className="text-gray-600 leading-relaxed">
        Tell us what you enjoy and TripPilot AI will create
        a travel plan based on your interests, budget and destination.
      </p>
        </div>
        </div>
    </section>
    <section className="py-20 px-6 bg-gray-50">
  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-12">
      <p className="text-blue-600 font-semibold mb-3">
        HOW IT WORKS
      </p>

      <h2 className="text-4xl font-bold">
        Your trip in three simple steps
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
        <span className="text-4xl font-bold text-blue-600">
            01
        </span>
        <h3 className="text-xl font-bold mt-4 md:mt-5 mb-3">Tell us about your trip</h3>
        <p className="text-gray-600 leading-relaxed">
          Choose your destination, dates, budget and interests.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
        <span className="text-4xl font-bold text-blue-600">
            02
            </span>
        <h3 className="text-xl font-bold mt-4 md:mt-5 mb-3">AI builds your plan</h3>
        <p className="text-gray-600 leading-relaxed">
          TripPilot AI creates a personalized itinerary for your trip.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
        <span className="text-4xl font-bold text-blue-600">
            03
        </span>
        <h3 className="text-xl font-bold mt-4 md:mt-5 mb-3">Save your adventure</h3>
        <p className="text-gray-600 leading-relaxed">
          Save your plan and manage your trips whenever you need.
        </p>
      </div>

    </div>

  </div>
</section>
<section className="py-9 px-6 bg-gray-800">
  <div className="max-w-3xl mx-auto text-center">

    <h2 className="text-3xl font-bold text-gray-300 mb-3">
      Ready for your next adventure?
    </h2>

    <p className="text-lg text-blue-100 mb-8">
      Let TripPilot AI create a personalized travel plan
      built around you.
    </p>

    <Link
      to="/generate-trips"
      className="inline-block bg-white text-blue-600 font-semibold px-7 py-3 rounded-lg hover:bg-gray-100 transition"
    >
      Generate Your Trip
    </Link>

  </div>
</section>
  </main>
  <footer className="bg-slate-950 text-gray-400 py-6 px-6">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <p className="font-semibold text-white">
      TripPilot AI
    </p>

    <p className="text-sm">
      AI-powered travel planning
    </p>
  </div>
</footer>
</>
    )
}

export default Home