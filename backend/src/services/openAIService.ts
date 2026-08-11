import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})
interface TripPlanData {
    destination: string;
    budget: number;
    startDate: Date;
    endDate: Date;
    travelers: number;
    interests: string[];
    notes: string;
}
export const generateTripPlan = async (tripData: TripPlanData) => {
   console.log("Trip data received by service:", tripData);

   const prompt = ` You are a travel planner assistant.
    You are given the following trip data:
    Create a detailed day-by-day travel itinerary based on the information above. Include the following details:
   Destination: ${tripData.destination}
   Budget: ${tripData.budget}
   Travelers: ${tripData.travelers}
   Start Date: ${tripData.startDate}
   End Date: ${tripData.endDate}
   Interests: ${tripData.interests.join(",")}
   Notes: ${tripData.notes}
   `
   const response = await client.responses.create({
    model:"gpt-5.6-luna",
    input:prompt,
});

   return{
    message: "Trip plan generated successfully",
    generatedPlan: response.output_text,
    }
}