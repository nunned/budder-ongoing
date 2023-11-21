import "../template_form.css";
import Form_header from "../form-comps/form_header";
import CustomDropdown from "../form-comps/CustomDropdown";
import { useState } from "react";
import DatePicker from "../form-comps/datepicker";
import AutoComplete from "../../AutoComplete";

function CreatePlantings() {
  const [formData, setFormData] = useState({
    groupName: "",
    dropdownValue: "",
    plantCount: "",
    strain: "",
    plantingDate: "",
    location: "",
  });

  //These need to be made dynamic
  const strains = ["Apple Fritter", "RAW", "Forum", "Runtz"]; // Add more strains as necessary

  const locations = ["BREEDING", "CLONE", "DRYING", "MOTHER", "VEGETATIVE"];

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

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<pre>${JSON.stringify(formData, null, 2)}</pre>`);
  };

  return (
    <div className="form-wrap">
      <div className="form-container">
        <Form_header text="Create Plantings" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Group Name</p>
                <input
                  type="text"
                  name="groupName"
                  placeholder="ex. B. Kush 5-30"
                  value={formData.groupName}
                  onChange={handleChange}
                />
              </div>
              <>
                <CustomDropdown
                  text="Plants Type"
                  options={["Clone", "Seed"]}
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
              <div className="itm-container">
                <p>Strain</p>
                <AutoComplete
                  options={strains}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      strain: selectedValue,
                    }));
                  }}
                />
              </div>
              <DatePicker
                dateTitle="Planting Date"
                onChange={handleChange}
                name="plantingDate"
              />
              <div className="itm-container">
                <p>Location</p>
                <AutoComplete
                  options={locations}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      location: selectedValue,
                    }));
                  }}
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

export default CreatePlantings;
