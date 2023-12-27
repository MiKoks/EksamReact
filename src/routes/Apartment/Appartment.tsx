import { ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import { JwtContext } from "../Root";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppartmentService } from "../../services/AppartmentService";
import { IAppartment } from "../../domain/IAppartment";
import IAppUser from "../../domain/IAppUser";


const Appartment = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const appartmentService = new AppartmentService(setJwtResponse!);

    const [data, setData] = useState([] as IAppartment[]);
    const [newAppartment, setNewAppartment] = useState({ floornumber: 0,roomcount: 0, monthlyrent: 0.0, status: "true",});

    const [apartment, setApartment] = useState([] as IAppartment[]);
    //const [selectedCourseId, setSelectedCourseId] = useState("");
    const apartmentService = new AppartmentService(setJwtResponse!);
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

    const handleNewAppartmentChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewAppartment((prevAppartment) => ({ ...prevAppartment, [name]: value }));
    };

    const handleNewStudygroupSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (jwtResponse) {
            const AppartmentToCreate = {
                ...newAppartment,
                //courseId: selectedCourseId // Use selectedCourseId if you want to use the selectedCourseId state variable
            };
            const mappingInput: IAppartment = {floorNumber: AppartmentToCreate.floornumber,roomCount: AppartmentToCreate.roomcount, monthlyRent: AppartmentToCreate.monthlyrent, status: AppartmentToCreate.status === "true" ? true:false };
            const success = await appartmentService.add(jwtResponse, mappingInput);
            

            if (success) {
                // refresh course list after
                const updatedAppartment = await apartmentService.getAll(jwtResponse);
                if (updatedAppartment) {
                    setData(updatedAppartment);
                }
                console.log("siin onnn!: ", updatedAppartment);
            }
            

            // clear
            setNewAppartment({ floornumber: 0,roomcount: 0, monthlyrent: 0.0, status: "",});
        }
    };

    const handleCourseChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setNewAppartment((prevStudyGroup) => ({
            ...prevStudyGroup,
            [name]: value // Make sure the name attribute of the select element is 'courseId'
        }));
        
    };


    return (
        <>
        <Outlet />
        <br></br>
            <label htmlFor="Appartment">StudyGroups</label>
            <ul>
            {data.map((appartment) => (
                <strong>
                <li key={appartment.id}>
                    {appartment.floorNumber} - {appartment.monthlyRent} - {appartment.roomCount} - {appartment.status}
                </li>
                </strong>
            ))}
        </ul>

        <form onSubmit={handleNewStudygroupSubmit}>
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
                <label htmlFor="status">status:</label>
                <input
                    type="text"
                    name="status"
                    value={newAppartment.status}
                    onChange={handleNewAppartmentChange}
                />
                <label htmlFor="status">status:</label>
                <input
                    type="text"
                    name="status"
                    value={newAppartment.status}
                    onChange={handleNewAppartmentChange}
                />
                <button type="submit">Add Appartment</button>
            </form>

        </>
    );
}

export default Appartment;