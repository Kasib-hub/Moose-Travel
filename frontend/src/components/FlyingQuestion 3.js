import { useNavigate } from 'react-router';

const FlyingQuestion = () => {

    const navigate = useNavigate();

    return (
        <>
        <h1>Will you be flying?</h1>
        <button onClick={() => navigate("/flight-search-selection")}>Yes</button>
        <button onClick={() => navigate("/hotel-question")}>No</button>
        </>
    )
}

export default FlyingQuestion;