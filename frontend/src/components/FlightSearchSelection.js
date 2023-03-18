import React, { useState } from "react";
import DirectFlightSearchBar from "./DirectFlightSearchBar";
import RoundTripSearchBar from "./RoundTripSearchBar";
import MultiFlightSearchBar from "./MultiFlightSearchBar";
import { CSSTransition } from "react-transition-group";

const FlightSearchSelection = ({ onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
     <CSSTransition classNames="fade" timeout={500}>
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
        {selectedOption === "round-trip" && <RoundTripSearchBar />}
        {selectedOption === "multi-trip" && <MultiFlightSearchBar />}
      </CSSTransition>
    </div>
  );
};

export default FlightSearchSelection;
