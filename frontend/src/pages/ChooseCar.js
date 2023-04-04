import React from 'react';

const ChooseCar = ({ car, onSelect }) => {
  return (
    <div className="choose-car">
      <h3>{car.name}</h3>
      <p>Price: {car.price}</p>
      <button onClick={() => onSelect(car)}>Select this car</button>
    </div>
  );
};

export default ChooseCar;
