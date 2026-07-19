import { Request, Response } from "express";
import  Trip  from "../models/Trip";

export const createTrip = async (req: Request, res: Response) => {
    try{ 
        const trip = await new Trip(req.body).save();
        res.status(201).json(trip);

    } catch (error) {
        res.status(500).json({ message: "Failed to create trip" });
    }
};

export const getTrips = async (req: Request, res: Response) => {
    try{
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: "Failed to get trips" });
    }
}
export const getTripById = async (req: Request, res: Response) => {
    try{
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ message: "Failed to get trip by id", error: error});
    }
}

export const updateTrip = async (req: Request, res: Response) => {
    try{
        const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ message: "Failed to update trip", error: error});
    }
}

export const deleteTrip = async (req: Request, res: Response) => {
    try{
        const trip = await Trip.findByIdAndDelete(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete trip", error: error});
    }
}