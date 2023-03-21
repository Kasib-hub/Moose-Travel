import { useNavigate } from 'react-router';

const SpecificLocations = () => {

    const navigate = useNavigate();

    return (
        <>
            <h1>Are there any places you know you want to go to?</h1>
            <input/>
            <button onClick={() => navigate("/itinerary")}>Next</button>
        </>
    )
}

export default SpecificLocations;