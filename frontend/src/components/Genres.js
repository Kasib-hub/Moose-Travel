import { useNavigate } from 'react-router';

const Genres = () => {

    const navigate = useNavigate();

    return (
        <>
        <h1>Genres will be displayed here</h1>
        <ul>
            <li>Food</li>
            <li>Historical Locations</li>
            <li>Natural Landmarks</li>
            <li>Tourist Attractions</li>
        </ul>
        <button onClick={() => navigate("/specific-locations")}>Next</button>
        </>
    )
}

export default Genres;