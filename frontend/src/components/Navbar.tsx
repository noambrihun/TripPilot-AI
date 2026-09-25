import {Link} from "react-router-dom"

function Navbar(){
    return(
            <nav className="bg-white shadow-md px-4 py-4 flex flex-col gap-4 md:flex-row md:justify-between md:items-center md:px-10 md:py-6 lg:px-16 lg:py-8">            <h1 className="text-xl font-bold">TripPilot AI</h1>
            <div className="flex gap-2 md:gap-6">
                <Link to="/"  className="bg-gray-700 text-white text-sm md:text-lg px-3 py-2 md:px-2 md:py-4 rounded-lg hover:text-white">Home</Link>
                <Link to="/my-trips" className= " bg-gray-700 text-white text-sm md:text-lg px-2 py-2 md:py-4 rounded-lg hover:text-white">My Trips</Link>
                <Link to="/generate-trips" className=" bg-blue-700 text-white text-sm md:text-lg px-3 py-2 md:px-2 md:py-4 rounded-lg hover:text-white">Generate Trips</Link>
            </div>
        </nav>
    )
}
export default Navbar;