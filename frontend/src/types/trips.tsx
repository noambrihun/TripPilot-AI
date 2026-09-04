export interface Trip {
    _id: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: number
    travelers: number;
    interests: string[];
    notes: string;
    generatedPlan: string;
    imagesUrls?: string[];
}