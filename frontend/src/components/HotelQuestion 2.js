import { useNavigate } from 'react-router';

const HotelQuestion = () => {

    const navigate = useNavigate();

    return (
        <>
        <h1>Will you be staying in a hotel?</h1>
        <button onClick={() => navigate("/hotel-search-selection")}>Yes</button>
        <button onClick={() => navigate("/genres")}>No</button>
        </>
    )
}

export default HotelQuestion;