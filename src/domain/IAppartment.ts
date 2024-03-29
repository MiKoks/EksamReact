import { IBaseEntity } from "./IBaseEntity";
import { ILease } from "./ILease";
import { IProperty } from "./IProperty";

export interface IAppartment extends IBaseEntity {
    floorNumber: number,
    roomCount: number,
    monthlyRent: number,
    status: boolean,
    propertyId: string,
    property: IProperty,
    currentLeaseId: string,
    currentLease: ILease,

}