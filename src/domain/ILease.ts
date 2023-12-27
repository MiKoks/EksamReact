import { IBaseEntity } from "./IBaseEntity";

export interface IAppartment extends IBaseEntity {
    floorNumber: number,
    roomCount: number,
    monthlyRent: number,
    status: boolean  
}