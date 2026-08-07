import './index.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import MyTrips from './pages/MyTrips';
import GenerateTrips from './pages/GenerateTrips';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<Home />} />
        <Route path="my-trips" element={<MyTrips />} />
        <Route path="generate-trips" element={<GenerateTrips />} />
      </Route>
    </Routes>
  );
}

export default App;
