import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import AutoComplete from "../../AutoComplete";
import CustomDropdown from "../form-comps/CustomDropdown";

function EditLocation() {
  const [formData, setFormData] = useState({
    ogLocationName: "",
    newLocationName: "",
    locationType: "",
  });
  //These need to be made dynamic
  const locationTypes = ["Indoor Grow", "Outdoor Grow"];
  const locations = ["BREEDING", "CLONE", "DRYING", "MOTHER", "VEGETATIVE"];

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
        <Form_header text="Edit Location" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
            <div className="itm-container">
                <p>Original Location Name</p>
                <AutoComplete
                  options={locations}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      ogLocationName: selectedValue,
                    }));
                  }}
                />
              </div>
              <div className="itm-container">
                <p>New Location Name</p>
                <input
                  type="text"
                  name="newLocationName"
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

export default EditLocation;
