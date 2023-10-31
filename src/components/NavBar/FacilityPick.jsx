import { useState } from "react";
import downArrow from "../../assets/arrowdown.svg";
import PropTypes from "prop-types";
import "./NavBar.css";

const FacilityPick = ({ selectedFacility, setSelectedFacility }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const facilities = [
    "Facility 1 | GAAA-GROW-NUM1",
    "Facility 2 | GAAA-GROW-NUM2",
    "Facility 3 | GAAA-GROW-NUM3",
    // ... add more facilities as needed
  ];

  const handleFacilityClick = (facility) => {
    setSelectedFacility(facility);
    setDropdownOpen(false); // Close the dropdown after selecting a facility
  };

  return (
    <div className="facility-container">
      <button
        className="facility-button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {selectedFacility || "Select a facility"}
        <img src={downArrow} alt="Arrow Down" className="down-arrow-icon" />
      </button>
      {dropdownOpen && (
        <div className="facility-dropdown">
          {facilities.map((facility) => (
            <div
              key={facility}
              className="facility-item"
              onClick={() => handleFacilityClick(facility)}
            >
              {facility}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FacilityPick.propTypes = {
  selectedFacility: PropTypes.string.isRequired,
  setSelectedFacility: PropTypes.func.isRequired,
};

export default FacilityPick;
