import React, { useState } from "react";
import DirectFlightSearchBar from "./DirectFlightSearchBar";
import RoundTripSearchBar from "./RoundTripSearchBar";
import MultiFlightSearchBar from "./MultiFlightSearchBar";

const FlightSearchSelection = ({ onSubmit }, props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    // <AnimatedPage>
    <div>
        <div className="flightTypeSelectionDiv"> 
            <div>
                <label>
                <input
                    type="radio"
                    value="direct"
                    checked={selectedOption === "direct"}
                    onChange={handleOptionChange}
                />
                Direct
                </label>
            </div>
            <div>
                <label>
                <input
                    type="radio"
                    value="round-trip"
                    checked={selectedOption === "round-trip"}
                    onChange={handleOptionChange}
                />
                Round Trip
                </label>
            </div>
            <div>
                <label>
                <input
                    type="radio"
                    value="multi-trip"
                    checked={selectedOption === "multi-trip"}
                    onChange={handleOptionChange}
                />
                Multi-Trip
                </label>
            </div>
        </div> 

        {selectedOption === "direct" && <DirectFlightSearchBar />}
        {selectedOption === "round-trip" && <RoundTripSearchBar onSubmit={() => window.location.href = '/'}/>}
        {selectedOption === "multi-trip" && <MultiFlightSearchBar onSubmit={() => window.location.href = '/'}/>}
    </div>
    // </AnimatedPage>
  );
};

export default FlightSearchSelection;
