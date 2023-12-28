import { IAppartment } from "./IAppartment";
import { IBaseEntity } from "./IBaseEntity";

export interface IPropertyAdd extends IBaseEntity {
    address: string,
    appartments: IAppartment[] 
}