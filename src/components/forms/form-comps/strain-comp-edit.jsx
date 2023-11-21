import CustomDropdown from "./CustomDropdown";
import CustomChecklist from "./CustomChecklist";
import { useState, useEffect } from "react";
import "../template_form.css";
import "./strain-comp.css";
import PropTypes from "prop-types";
import Percentages from "../form-comps/percentages";

function StrainCompEdit({ itemNumber, onDataChange }) {
  const [strainData, setStrainData] = useState({
    ogStrainName: "",
    newStrainName: "",
    testingStatus: "",
    thcContent: "",
    cbdContent: "",
    sativaPercentage: "",
    indicaPercentage: "",
    selectedFacilities: {},
  });

  const handleIndicaChange = (newIndica) => {
    setStrainData((prevData) => ({
      ...prevData,
      indicaPercentage: newIndica,
      sativaPercentage: 100 - newIndica,
    }));
  };

  const handleSativaChange = (newSativa) => {
    setStrainData((prevData) => ({
      ...prevData,
      sativaPercentage: newSativa,
      indicaPercentage: 100 - newSativa,
    }));
  };

  useEffect(() => {
    onDataChange(itemNumber, strainData);
  }, [strainData, itemNumber, onDataChange]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStrainData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFacilitiesChange = (event) => {
    const selectedOptionsObject = event.target.value;
    // Convert the object of selected options into an array of selected options
    const selectedFacilities = Object.keys(selectedOptionsObject).filter(option => selectedOptionsObject[option]);
    // Extract IDs from selected facilities and update the state
    const selectedIDs = selectedFacilities.map(facility => facility.split('|')[1].trim());
    setStrainData((prevData) => ({
      ...prevData,
      selectedFacilities: selectedIDs,
    }));
  };

  const testingStatuses = ["None", "In-House", "Third-Party"];
  const facilities = [
    "TRAN GLENPOOL LLC | GAAA-5ZXA-V5GY",
    "VZN | GAAA-4Y9A-ZPOT",
    "VZN LABS | PAAA-4227-9BUA",
  ];

  return (
    <div className="itm-container strain-comp">
      <div className="itm-container">
        <p>Original Strain Name #{itemNumber}</p>
        <input
          type="text"
          name="ogStrainName"
          placeholder="Enter strain name..."
          onChange={handleChange}
        />
      </div>
      <div className="itm-container">
        <p>New Strain Name #{itemNumber}</p>
        <input
          type="text"
          name="newStrainName"
          placeholder="Enter strain name..."
          onChange={handleChange}
        />
      </div>
      <div className="itm-container">
        <p>Testing Status</p>
        <CustomDropdown
          options={testingStatuses}
          name="testingStatus"
          onChange={handleChange}
        />
      </div>
      <div className="itm-container">
        <div className="input-group">
          <p className="custom-strain-header">THC %</p>
          <input
            type="text"
            name="thcContent"
            placeholder=""
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <p className="custom-strain-header">CBD %</p>
          <input
            type="text"
            name="cbdContent"
            placeholder=""
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="itm-container">
        <Percentages
          onIndicaChange={handleIndicaChange}
          onSativaChange={handleSativaChange}
        />
      </div>
      <div className="itm-container">
        <p>Facilities</p>
        <CustomChecklist
          options={facilities}
          name="selectedFacilities"
          onChange={handleFacilitiesChange} // Handle the change event from CustomChecklist
        />
      </div>
    </div>
  );
}

StrainCompEdit.propTypes = {
  itemNumber: PropTypes.number.isRequired,
  onDataChange: PropTypes.func.isRequired,
};

export default StrainCompEdit;
