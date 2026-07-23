import mongoose , { Document} from "mongoose";

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
      minlength: 2,
    },
  
    budget: {
      type: Number,
      required: true,
      min: 1,
    },
  
    travelers: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
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