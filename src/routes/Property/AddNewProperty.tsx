import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { JwtContext } from "../Root";
import { PropertyService } from "../../services/PropertyService";
import { IAppartmentAdd } from "../../domain/IAppartmentAdd";
import { IProperty } from "../../domain/IProperty";

const AddNewProperty = () => {
    /*const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const propertyService = new PropertyService(setJwtResponse!);
    const [data, setData] = useState([] as IProperty[]);
    const [newProperty, setNewProperty] = useState({
        address: '',
        appartments: [] as IAppartmentAdd[],
    });
    useEffect(() => {
        if (jwtResponse) {
            propertyService.getAll(jwtResponse).then(
                response => {
                    console.log(response);
                    if (response){
                        setData(response);
                    } else {
                        setData([]);
                    }
                }
            );
        }
    }, []);

    const handleAddApartment = () => {
        setNewProperty(prevProperty => ({
            ...prevProperty,
            apartments: [
                ...prevProperty.appartments,
                {
                    floorNumber: 0,
                    roomCount: 0,
                    monthlyRent: 0,
                    status: true, // Assuming the default status is true
                    // Other necessary fields with default values or handled during creation
                }
            ]
        }));
    };

    const handleRemoveApartment = (index: number) => {
        setNewProperty(prevProperty => ({
            ...prevProperty,
            apartments: prevProperty.appartments.filter((_, i) => i !== index)
        }));
    };

    const handleApartmentChange = (index: number, key: keyof IAppartmentAdd, value: string) => {
        const parsedValue = key === 'monthlyRent' ? parseFloat(value) : parseInt(value);

        setNewProperty(prevProperty => ({
            ...prevProperty,
            apartments: prevProperty.appartments.map((appartment, i) => 
                i === index ? { ...appartment, [key]: parsedValue } : appartment
            )
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        //const success = await propertyService.add(jwtResponse!, newProperty);
        //if (success) {
            // Handle successful addition of property, maybe clear form or navigate user
        //} 
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        value={newProperty.address}
                        onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                        placeholder="Property Address"
                    />
                    <button type="button" onClick={handleAddApartment}>Add Apartment</button>
                    {newProperty.appartments.map((apartment, index) => (
                        <div key={index}>
                            <input
                                type="number"
                                value={apartment.floorNumber}
                                onChange={(e) => handleApartmentChange(index, 'floorNumber', e.target.value)}
                                placeholder="Floor Number"
                            />
                            <input
                                type="number"
                                value={apartment.roomCount}
                                onChange={(e) => handleApartmentChange(index, 'roomCount', e.target.value)}
                                placeholder="Room Count"
                            />
                            <input
                                type="number"
                                value={apartment.monthlyRent}
                                onChange={(e) => handleApartmentChange(index, 'monthlyRent', e.target.value)}
                                placeholder="Monthly Rent"
                            />
                            <button type="button" onClick={() => handleRemoveApartment(index)}>Remove</button>
                        </div>
                    ))}
                </div>
                <button type="submit">Create Property</button>
            </form>
        </>
    );*/
    
};

export default AddNewProperty;
