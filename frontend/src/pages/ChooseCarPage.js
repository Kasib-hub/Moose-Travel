import React from 'react';
import RentalCarForm from '../components/RentalCarForm';

const ChooseCar = ({ car, onSelect }) => {
  return (
    <div>
      <h1>Choose a car</h1>
      <RentalCarForm />
      {car && (
        <div className="choose-car">
          <h3>{car.name}</h3>
          <p>Price: {car.price}</p>
          <button onClick={() => onSelect(car)}>Select this car</button>
        </div>
      )}
    </div>
  );
};

export default ChooseCar;
