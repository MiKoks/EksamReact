import { ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import { JwtContext } from "../Root";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppartmentService } from "../../services/AppartmentService";
import { IAppartment } from "../../domain/IAppartment";
import { IAppartmentAdd } from "../../domain/IAppartmentAdd";
import IAppUser from "../../domain/IAppUser";


const Appartment = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const appartmentService = new AppartmentService(setJwtResponse!);

    const [data, setData] = useState([] as IAppartment[]);
    const [newAppartment, setNewAppartment] = useState({ floornumber: 0,roomcount: 0, monthlyrent: 0.0, status: true ? true:false,});

    const [apartment, setApartment] = useState([] as IAppartment[]);
    //const [selectedCourseId, setSelectedCourseId] = useState("");
    //const apartmentService = new AppartmentService(setJwtResponse!);
    useEffect(() => {
        if (jwtResponse) {
            appartmentService.getAll(jwtResponse).then(
                response => {
                    console.log(response);
                    if (response){
                        setData(response);
                    } else {
                        setData([]);
                    }
                }
            );
            appartmentService.getAll(jwtResponse).then(
                response => {
                    if (response) {
                        setApartment(response);
                    }
                }
            );
        }
    }, []);

    const navigate = useNavigate();

    /*const handleStudygroupClick = (appartment: IAppartment) => {
        console.log("Course data to be passed:", appartment);
        navigate(`../studygroups/selectedStudyGroupView`, { state: appartment });
    };*/

    const handleNewStudygroupSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (jwtResponse) {
            const AppartmentToCreate = {
                ...newAppartment,
                //courseId: selectedCourseId // Use selectedCourseId if you want to use the selectedCourseId state variable
            };
            const mappingInput: IAppartmentAdd = {floorNumber: AppartmentToCreate.floornumber,roomCount: AppartmentToCreate.roomcount, monthlyRent: AppartmentToCreate.monthlyrent, status: AppartmentToCreate.status };
            const success = await appartmentService.add(jwtResponse, mappingInput);
            

            if (success) {
                // refresh course list after
                const updatedAppartment = await appartmentService.getAll(jwtResponse);
                if (updatedAppartment) {
                    setData(updatedAppartment);
                }
                console.log("siin onnn!: ", updatedAppartment);
            }
            

            // clear
            setNewAppartment({ floornumber: 0,roomcount: 0, monthlyrent: 0.0, status: true,});
        }
    };

    const handleNewAppartmentChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = event.target;
        if (type === "checkbox") {
            setNewAppartment(prevAppartment => ({ ...prevAppartment, [name]: checked }));
        } else {
            setNewAppartment(prevAppartment => ({ ...prevAppartment, [name]: value }));
        }
    };

    return (
        <>
        <Outlet />
        <br></br>
            <label htmlFor="Appartment">Appartments</label>
            <ul>
            {data.map((appartment) => (
                <strong>
                <li key={appartment.id}>
                    floornumber: {appartment.floorNumber} | monthly rent: {appartment.monthlyRent} | room count: {appartment.roomCount} | availability: {appartment.status ? "Available": "Rented"} | current lease holder: {appartment.currentLease !== null && appartment.currentLease !== undefined ? appartment.currentLease.appUser.firstName + appartment.currentLease.appUser.lastName : ""}
                </li>
                </strong>
            ))}
        </ul>

        {/*<form onSubmit={handleNewStudygroupSubmit}>
                <label htmlFor="floornumber">floor number:</label>
                <input
                    type="text"
                    name="floornumber"
                    value={newAppartment.floornumber}
                    onChange={handleNewAppartmentChange}
                    
                />
                <label htmlFor="roomcount">room Count:</label>
                <input
                    type="text"
                    name="roomcount"
                    value={newAppartment.roomcount}
                    onChange={handleNewAppartmentChange}
                />
                <label htmlFor="monthlyrent">monthlyrent:</label>
                <input
                    type="text"
                    name="monthlyrent"
                    value={newAppartment.monthlyrent}
                    onChange={handleNewAppartmentChange}
                />
                <label htmlFor="status">is available:</label>
                <input
                    type="checkbox"
                    name="status"
                    checked={newAppartment.status}
                    onChange={handleNewAppartmentChange}
                />
                <button type="submit">Add Appartment</button>
            </form>*/}

        </>
    );
}

export default Appartment;