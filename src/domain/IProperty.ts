import { IAppartment } from "./IAppartment";
import { IBaseEntity } from "./IBaseEntity";

export interface IProperty extends IBaseEntity {
    address: string,
    apartments: IAppartment[]
}