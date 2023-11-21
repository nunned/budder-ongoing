import "./template_form.css";
import Form_header from "./folder-comp/form_header";
import CustomDropdown from "./folder-comp/CustomDropdown";
import { useState } from "react";
import DatePicker from "./folder-comp/datepicker";

function MyForm() {
  const [formData, setFormData] = useState({
    groupName: "",
    dropdownValue: "",
    dateValue: "",
    plantCount: "",
    strain: "",
  });

  const [suggestion, setSuggestion] = useState("");

  const strains = ["StrainA", "bar", "StrainC"]; // Add more strains as necessary

  const handleStrainChange = (event) => {
    const value = event.target.value;
    const foundStrain = strains.find((strain) =>
      strain.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestion(foundStrain ? foundStrain.substring(value.length) : "");
    handleChange(event);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Push formData to your backend
    console.log(formData);
  };

  return (
    <div className="form-wrap">
      <div className="form-container">
        <Form_header text="Create Plantings" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>test</p>
                <input
                  type="text"
                  name="strain"
                  placeholder="ex. B. Kush 5-30"
                  value={formData.groupName}
                  onChange={handleChange}
                />
              </div>
              <>
                <CustomDropdown
                  options={["Option 1", "Option 2", "Option 3"]}
                  name="dropdownValue"
                  onChange={handleChange}
                />
              </>
              <div className="itm-container">
                <p>Plants Count</p>
                <input
                  type="text"
                  name="plantCount"
                  placeholder="ex. 100"
                  value={formData.plantCount}
                  onChange={handleChange}
                />
              </div>
              <div className="itm-container strain-input-container">
                <p>Strain</p>
                <input
                  type="text"
                  name="strain"
                  placeholder="ex. RAW"
                  value={formData.strain}
                  onChange={handleStrainChange}
                  className="user-input"
                />
                {formData.strain.length > 0 && suggestion && (
                  <div className="suggestions">
                    {formData.strain}
                    <strong>{suggestion}</strong>
                  </div>
                )}
              </div>
              <DatePicker />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyForm;
