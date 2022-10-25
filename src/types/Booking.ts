import { User } from "./User";
import { Price } from "./Price";

export interface Booking {
    traveler: User;
    payment: string;
    startDate: Date;
    endDate: Date;
    price: Price;
}