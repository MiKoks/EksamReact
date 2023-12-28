import { IBaseEntity } from "./IBaseEntity";
import { ILease } from "./ILease";
import { IProperty } from "./IProperty";

export interface IAppartmentAdd extends IBaseEntity {
    floorNumber: number,
    roomCount: number,
    monthlyRent: number,
    status: boolean,

}