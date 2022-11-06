import {User} from "./User";
import {Place, PriceType} from "./PlacesTypes";

export enum ReservationFields {
    Id = 'id',
    User = 'user',
    Accommodation = 'accommodation',
    Price = 'price',
    Status = 'status',
    StartingDate = 'startingDate',
    FinishingDate = 'finishingDate',
    PaymentMethod = 'paymentMethod',
}

export interface ReservationView {
    [ReservationFields.Id]: number,
    [ReservationFields.User]: User,
    [ReservationFields.Price]: PriceType,
    [ReservationFields.Status]: ReservationStatus,
    [ReservationFields.StartingDate]: Date,
    [ReservationFields.FinishingDate]: Date,
    [ReservationFields.PaymentMethod]: PaymentMethodTypes,
    [ReservationFields.Accommodation]: Place,
}

export enum PaymentMethodTypes {
    CASH
}

export enum ReservationStatus {
    PENDING,
    ACCEPTED,
    NOT_ACCEPTED
}
