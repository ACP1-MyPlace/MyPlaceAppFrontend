import {User} from "./User";

export enum PlaceFields {
    Id = 'id',
    User = 'user',
    UserId = 'userId',
    PropertyType = 'propertyType',
    Country = 'country',
    State = 'state',
    Street = 'street',
    StreetNumber = 'streetNumber',
    Floor = 'floor',
    Apartment = 'apartment',
    RoomsCount = 'roomsCount',
    BathroomCount = 'bathroomCount',
    GarageAvailable = 'garageAvailable',
    PetsAvailable = 'petsAvailable',
    Services = 'services',
    PricePerNight = 'price',
    Description = 'description',
    PhotosIds = 'photoIds',
}

export interface NewPlaceForm {
    [PlaceFields.UserId]: number,
    [PlaceFields.PropertyType]: number,
    [PlaceFields.Country]: string,
    [PlaceFields.State]: string,
    [PlaceFields.Street]: string,
    [PlaceFields.StreetNumber]: number,
    [PlaceFields.Floor]?: string,
    [PlaceFields.Apartment]?: string,
    [PlaceFields.RoomsCount]: number,
    [PlaceFields.BathroomCount]: number,
    [PlaceFields.GarageAvailable]: boolean,
    [PlaceFields.PetsAvailable]: boolean,
    [PlaceFields.Services]: number[],
    [PlaceFields.PricePerNight]: PriceType,
    [PlaceFields.Description]?: string,
    [PlaceFields.PhotosIds]?: string[],
}

export interface Place {
    [PlaceFields.Id]: number,
    [PlaceFields.User]: User,
    [PlaceFields.PropertyType]: number,
    [PlaceFields.Country]: string,
    [PlaceFields.State]: string,
    [PlaceFields.Street]: string,
    [PlaceFields.StreetNumber]: number,
    [PlaceFields.Floor]?: string,
    [PlaceFields.Apartment]?: string,
    [PlaceFields.RoomsCount]: number,
    [PlaceFields.BathroomCount]: number,
    [PlaceFields.GarageAvailable]: boolean,
    [PlaceFields.PetsAvailable]: boolean,
    [PlaceFields.Services]: number[],
    [PlaceFields.PricePerNight]: PriceType,
    [PlaceFields.Description]?: string,
}

export enum CurrencyTypeFields {
    Id = 'currencyId',
    Name = 'currencyName'
}

export interface CurrencyType {
    [CurrencyTypeFields.Id]: string,
    [CurrencyTypeFields.Name]: string,
}

export enum PriceTypeFields {
    Currency = "currency",
    Amount = 'amount'
}

export interface PriceType {
    [PriceTypeFields.Currency]: CurrencyType,
    [PriceTypeFields.Amount]: number
}

export enum AccommodationService {
    WIFI,
    KITCHEN,
    MICROWAVE,
    AIR,
    LAUNDRY,
    TV,
    POOL
}

export enum PropertyType {
    HOUSE,
    APARTMENT
}