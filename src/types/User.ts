
export interface User{
    id: number;
    mail: string;
    firstName: string;
    lastName: string;
    type: "HOST_USER" | "TRAVELER_USER"
}