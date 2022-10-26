import { User } from "./User";

interface Price{
    currency: {
        currencyId:string,
        currencyName:string
    },
    amount: number
}

export interface Rental {
    host: User;
    id: number;
    userId: number;
    propertyType: "HOUSE" | "APARTMENT";
    country: string;
    state: string;
    street: string;
    streetNumber: string;
    floor?: string;
    apartment?: string;
    roomsCount?: number;
    bathroomCount?: number;
    garageAvailable?: boolean;
    petsAvailable?: boolean;
    services?: ("WIFI" | "KITCHEN" | "TV" | "LAUNDRY")[];
    description?: string;
    price: Price;
}

export interface Rentals extends Array<Rental>{};