// import React, { useState } from 'react';
// import RentalCarForm from '../components/RentalCarForm';

const RentalCarPage = () => {
  // const { access_token } = useAuth();
  // const [searchResults, setSearchResults] = useState([]);
  // const [selectedCar, setSelectedCar] = useState(null);

  // const handleSearch = async (searchData) => {
    
  //   const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const response = await fetch(`http://${BASE_URL}/api/rental_car_search/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // Authorization: `Bearer ${access_token}`,
  //     },
  //     body: JSON.stringify(searchData),
  //   });

  //   const data = await response.json();
  //   setSearchResults(data);
  //   setSelectedCar(null);
  // };

  // const handleCarSelect = (car) => {
  //   setSelectedCar(car);
  // };

  // const handleRentalSubmit = (rentalData) => {
  //   alert(`You have successfully booked ${rentalData.car.make} ${rentalData.car.model} from ${rentalData.pickupDate} to ${rentalData.dropoffDate} at ${rentalData.rentalAgency} for $${rentalData.totalPrice}`);
  //   console.log(rentalData);
  // };

  return (
    <div>
      {/* <h1>Rental Cars</h1>
      <RentalCarForm onSearch={handleSearch} access_token={access_token}/>
      {searchResults.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Rental Agency</th>
              <th>Daily Rate</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((car) => (
              <tr key={car.id}>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.rental_agency}</td>
                <td>{car.daily_rate}</td>
                <td>
                  <button onClick={() => handleCarSelect(car)}>Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {selectedCar && (
        <div>
          <h2>Selected Car: {selectedCar.make} {selectedCar.model}</h2>
          <RentalCarForm car={selectedCar} onSubmit={handleRentalSubmit} access_token={access_token} />
        </div>
      )} */}
    </div>
  );
};

export default RentalCarPage;
