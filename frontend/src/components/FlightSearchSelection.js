import React, { useState } from "react";
import DirectFlightSearchBar from "./DirectFlightSearchBar";
import RoundTripSearchBar from "./RoundTripSearchBar";
import MultiFlightSearchBar from "./MultiFlightSearchBar";
import "./FlightSearchSelection.css"


const FlightSearchSelection = ({ onSubmit, ChangeRoute }, props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
        <div className="flightTypeSelectionDiv"> 
            <div className="radio-btns">
                <input
                    type="radio"
                    value="direct"
                    id="direct"
                    checked={selectedOption === "direct"}
                    onChange={handleOptionChange}
                />
                <label htmlFor="direct">Direct</label>

            </div>
            <div className="radio-btns">
                <input
                    type="radio"
                    value="round-trip"
                    id="round-trip"
                    checked={selectedOption === "round-trip"}
                    onChange={handleOptionChange}
                />
                <label htmlFor="round-trip">Round Trip</label>
            </div>
            <div className="radio-btns">
                <input
                    type="radio"
                    value="multi-trip"
                    id="multi-trip"
                    checked={selectedOption === "multi-trip"}
                    onChange={handleOptionChange}
                />
                <label htmlFor="multi-trip">
                Multi-Trip
                </label>
            </div>
        </div> 

        {selectedOption === "direct" && <DirectFlightSearchBar ChangeRoute={ChangeRoute}/>}
        {selectedOption === "round-trip" && <RoundTripSearchBar onSubmit={() => window.location.href = '/'} ChangeRoute={ChangeRoute}/>}
        {selectedOption === "multi-trip" && <MultiFlightSearchBar onSubmit={() => window.location.href = '/'} ChangeRoute={ChangeRoute}/>}
    </div>
    // </AnimatedPage>
  );
};

export default FlightSearchSelection;
