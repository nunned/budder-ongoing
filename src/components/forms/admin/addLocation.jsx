import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import CustomChecklist from "../form-comps/CustomChecklist";
import CustomDropdown from "../form-comps/CustomDropdown";

function AddLocation() {
  const [formData, setFormData] = useState({
    locationName: "",
    locationType: "",
  });
  //These need to be made dynamic
  const locationTypes = ["Indoor Grow", "Outdoor Grow"];
  const facilities = [
    "TRAN GLENPOOL LLC | GAAA-5ZXA-V5GY",
    "VZN | GAAA-4Y9A-ZPOT",
    "VZN LABS | PAAA-4227-9BUA",
  ];

  const handleFacilitiesChange = (event) => {
    const selectedOptionsObject = event.target.value;
    const selectedFacilities = Object.keys(selectedOptionsObject).filter(option => selectedOptionsObject[option]);
    const selectedIDs = selectedFacilities.map(facility => facility.split('|')[1].trim());
    setFormData((prevData) => ({
      ...prevData,
      selectedFacilities: selectedIDs, // Ensure this is updating the correct piece of state
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Push formData to your backend
    console.log(formData);

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<pre>${JSON.stringify(formData, null, 2)}</pre>`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-wrap">
      <div className="form-container">
        <Form_header text="Add Location" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Location Name</p>
                <input
                  type="text"
                  name="locationName"
                  placeholder="Enter Location name..."
                  onChange={handleChange}
                />
              </div>
              <>
                <CustomDropdown
                  text="Location Type"
                  options={locationTypes}
                  name="locationType"
                  onChange={handleChange}
                />
              </>
              <div className="itm-container">
                <p>Facilities</p>
                <CustomChecklist
                  options={facilities}
                  name="addLocationSelectedFacilities"
                  onChange={handleFacilitiesChange} // Handle the change event from CustomChecklist
                />
              </div>
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLocation;
