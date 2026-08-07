import { Link } from "react-router-dom";
function Navbar(){
    return(
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">TripPilot AI</h1>
            <div className="flex gap-6">
                <Link to="/" className="bg-gray-700 text-white text-lg px-2 py-4 rounded-lg hover:text-white">Home</Link>
                <Link to="/my-trips" className= " bg-gray-700 text-white text-lg px-2 py-4 rounded-lg hover:text-white">My Trips</Link>
                <Link to="/generate-trips" className=" bg-blue-600 text-white text-lg px-2 py-4 rounded-lg hover:text-white">Generate Trips</Link>
            </div>
        </nav>
    )
}
export default Navbar;