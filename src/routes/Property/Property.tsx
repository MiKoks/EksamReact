import { ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import { JwtContext } from "../Root";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { PropertyService } from "../../services/PropertyService";
import { IProperty } from "../../domain/IProperty";


const Property = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const propertyService = new PropertyService(setJwtResponse!);

    const [data, setData] = useState([] as IProperty[]);
    const [newProperty, setNewAppartment] = useState({ address: 0, apartments: []});

    const [property, setProperty] = useState([] as IProperty[]);

    //searching, sorting and filtering
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [roomNumberSearch, setRoomNumberSearch] = useState('');
    const [floorNumberSearch, setFloorNumberSearch] = useState('');
    const [displayData, setDisplayData] = useState<IProperty[]>([]);

    useEffect(() => {
        if (jwtResponse) {
            propertyService.getAll(jwtResponse).then(
                response => {
                    console.log(response);
                    if (response){
                        setData(response);
                        for (let index = 0; index < response.length; index++) {
                            const element = response[index];
                            console.log("siiin on resp : " + element.apartments);
                        }
                        
                    } else {
                        setData([]);
                    }
                }
            );
        }
        
    }, [jwtResponse]); 

    useEffect(() => {
        let filteredProperties = data;

    if (searchText.trim()) {
        filteredProperties = filteredProperties.filter(property =>
            property.address.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    if (roomNumberSearch.trim()) {
        filteredProperties = filteredProperties.filter(property =>
            property.apartments.some(apartment => 
                apartment.roomCount.toString() === roomNumberSearch
            )
        );
    }

    if (floorNumberSearch.trim()) {
        filteredProperties = filteredProperties.filter(property =>
            property.apartments.some(apartment => 
                apartment.floorNumber.toString() === floorNumberSearch
            )
        );
    }

    setDisplayData(filteredProperties);

}, [searchText, roomNumberSearch, floorNumberSearch, data]);



    return (
        <>
        <Outlet />
        <div>
        <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search properties..."
        />
        <input
            type="number"
            value={roomNumberSearch}
            onChange={(e) => setRoomNumberSearch(e.target.value)}
            placeholder="Search by number of rooms..."
        />
        <input
            type="number"
            value={floorNumberSearch}
            onChange={(e) => setFloorNumberSearch(e.target.value)}
            placeholder="Search by floor number..."
        />
        <button onClick={() => setTriggerSearch(true)}>Search</button>
        </div>
        <br></br>
        <label htmlFor="Property">Properties:</label>
        <ul>
    {data
        .filter(property => property.address.toLowerCase().includes(searchText.toLowerCase()))
        .map((property) => (
            <li key={property.id}>
                <strong>Address: {property.address}</strong>
                {property.apartments && property.apartments.length > 0 ? (
                    <ul>
                        {property.apartments.map((apartment) => (
                            <li key={apartment.id}>
                                Floor: {apartment.floorNumber} - Rooms: {apartment.roomCount} - Monthly Rent: {apartment.monthlyRent} - current lease holder: {apartment.currentLease !== null && apartment.currentLease !== undefined ? apartment.currentLease.appUser.firstName + apartment.currentLease.appUser.lastName : ""} 
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No apartments available for this property.</p>
                )}
            </li>
        ))}
</ul>

    </>

    );
}

export default Property;

