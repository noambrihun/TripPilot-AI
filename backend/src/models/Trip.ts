import mongoose , {Schema, Document} from "mongoose";

export interface ITrip extends Document {
    destination: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    travelers: number;
    interests: string[];
    notes?: string;
    generatedPlan: string;
  }const tripSchema = new mongoose.Schema({
    destination: {
      type: String,
      required: true,
      trim: true,
    },
  
    budget: {
      type: Number,
      required: true,
    },
  
    travelers: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    interests: {
      type: [String],
      required: true,
    },
    notes:{
      type: String,
    },
    generatedPlan: {
      type: String,
      required: true,
    },
  
  });

  const Trip = mongoose.model<ITrip>("Trip", tripSchema);

export default Trip;