import { Booking } from "../types/Booking";

export const sampleData : Booking = {

        traveler: {
            id: 1,
            mail: "doe@mail.com",
            firstName: "Doe",
            lastName: "Mayer",
            type: "HOST_USER"
        },
        payment: "Efectivo",
        price: {
            currency: {
                currencyId: "USD",
                currencyName: "Dolares"
            },
            amount: 120
        },
        startDate: new Date(),
        endDate: new Date()
}