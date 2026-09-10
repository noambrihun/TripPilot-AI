export type Currency = "USD" | "ILS" | "EUR";

export interface Trip {
    _id: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: number;
    currency?: Currency;
    travelers: number;
    interests: string[];
    notes: string;
    generatedPlan: string;
    imagesUrls?: string[];
}

export const currencySymbol: Record<Currency, string> = {
    USD: "$",
    ILS: "₪",
    EUR: "€",
};