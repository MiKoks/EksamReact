import IAppUser from "./IAppUser";
import { IBaseEntity } from "./IBaseEntity";

export interface ILease extends IBaseEntity {
     appartmentId: string,
     appUserId: string,
     appUser: IAppUser
     startDate?: Date,
     endDate?: Date,
     monthlyRent: number,
     servicesIncluded: string,
}