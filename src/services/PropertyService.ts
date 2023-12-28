import { IProperty } from "../domain/IProperty";
import { IJWTResponse } from "../dto/IJWTResponse";
import { BaseEntityService } from "./BaseEntityService";
import { IPropertyAdd } from "../domain/IPropertyAdd";

export class PropertyService extends BaseEntityService<IProperty> {
    constructor(setJwtResponse: ((data: IJWTResponse | null) => void)){
        super('/Property', setJwtResponse);
    }

    async add(jwtData: IJWTResponse, newProperty: IPropertyAdd): Promise<boolean> {
        try {
            const response = await this.axios.post("http://localhost:7261/api/property", newProperty, {
                headers: {
                    'Authorization': 'Bearer ' + jwtData.jwt 
                }
            });

            if (response.status === 201) {
                console.log('Appartment added successfully:', response.data);
                return true;
            }

            console.log('Failed to add Property:', response);
            return false;
        } catch (e) {
            console.error('Error adding Property:', (e as Error).message, e);
            return false;
        }
    }
    
}