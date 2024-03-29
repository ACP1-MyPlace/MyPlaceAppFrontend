import { User } from "./User";
import { Price } from "./Price";

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
    photoIds?: string[];
}

export interface Rentals extends Array<Rental>{};