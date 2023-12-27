import { IAppartment } from "../domain/IAppartment";
import { IJWTResponse } from "../dto/IJWTResponse";
import { BaseEntityService } from "./BaseEntityService";

export class AppartmentService extends BaseEntityService<IAppartment> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)){
        super('/Apartment', setJwtResponse);
    }

    async add(jwtData: IJWTResponse, newAppartment: IAppartment): Promise<boolean> {
        try {
            const response = await this.axios.post("http://localhost:7261/api/Appartment", newAppartment, {
                headers: {
                    'Authorization': 'Bearer ' + jwtData.jwt 
                }
            });

            if (response.status === 201) {
                console.log('Appartment added successfully:', response.data);
                return true;
            }

            console.log('Failed to add Appartment:', response);
            return false;
        } catch (e) {
            console.error('Error adding Appartment:', (e as Error).message, e);
            return false;
        }
    }
    
}