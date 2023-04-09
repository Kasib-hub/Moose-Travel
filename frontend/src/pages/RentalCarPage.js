import React, { useState } from 'react';
import RentalCarForm from '../components/RentalCarForm';
import { useParams, useNavigate } from 'react-router-dom';

const RentalCarPage = ({selections, setSelections}) => {

  const { itineraryID } = useParams();
  const navigate = useNavigate();


  const ChangeRoute = () => {
    if (selections.length < 1) {
      return navigate(`/itinerary/${itineraryID}/choose-genre`)
    }
    console.log(selections)
    let route = selections[0]
    setSelections(selections.slice(1))
    navigate(route)
  }

  return (
    <div>
      <RentalCarForm ChangeRoute={ChangeRoute}/>
    </div>
  );
};

export default RentalCarPage;
