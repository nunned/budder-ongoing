import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import DatePicker from "../form-comps/datepicker";
import AutoComplete from "../../AutoComplete";
import CustomDropdown from "../form-comps/CustomDropdown";

function CreatePFVP() {
  const [formData, setFormData] = useState({
    sourcePlant: "",
    groupName: "",
    plantsType: "",
    plantCount: "",
    location: "",
    strain: "",
    plantDate: "",
  });

  //These need to be made dynamic
  const sourceTags = [
    "1A40E0100019269000000074",
    "1A40E0100019269000000075",
    "1A40E0100019269000000076",
    "1A40E0100019269000000077",
    "1A40E0100019269000000078",
    "1A40E0100019269000000079",
    "1A40E0100019269000000080",
    "1A40E0100019269000000081",
    "1A40E0100019269000000082",
    "1A40E0100019269000000083",
  ];

  const strains = ["Apple Fritter", "RAW", "Forum", "Runtz"];

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
        <Form_header text="Create Plantings from Vegetative Plants" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Source Plant Tag</p>
                <AutoComplete
                  options={sourceTags}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      sourcePlant: selectedValue,
                    }));
                  }}
                />
              </div>
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
                  name="plantsType"
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
                name="plantDate"
              />
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

export default CreatePFVP;
