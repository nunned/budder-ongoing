import "../template_form.css";
import Form_header from "../form-comps/form_header";
import CustomDropdown from "../form-comps/CustomDropdown";
import { useState } from "react";
import DatePicker from "../form-comps/datepicker";
import AutoComplete from "../../AutoComplete";

function ChangeIPGP() {
  const [formData, setFormData] = useState({
    groupName: "",
    newPhase: "",
    newLocation: "",
    plantsCount: "",
    startingTag: "",
    endingTag: "",
    changeDate: "",
  });

  //These need to be made dynamic
  const groupNames = ["B. Kush 5-30", "A. Kush 20-40", "C. Kush 80-160"];

  const tags = [
    "1A40E0100019269000000064",
    "1A40E0100019269000000065",
    "1A40E0100019269000000066",
    "1A40E0100019269000000067",
    "1A40E0100019269000000068",
    "1A40E0100019269000000069",
    "1A40E0100019269000000070",
    "1A40E0100019269000000071",
    "1A40E0100019269000000072",
    "1A40E0100019269000000073",
  ];

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
        <Form_header text="Change Immature Plants Growth Phase" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Group Name</p>
                <AutoComplete
                  options={groupNames}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      groupName: selectedValue,
                    }));
                  }}
                />
              </div>
              <>
                <CustomDropdown
                  text="New Phase"
                  options={["Flowering", "Vegetative"]}
                  name="newPhase"
                  onChange={handleChange}
                />
              </>
              <div className="itm-container">
                <p>New Location</p>
                <p className="newloc-subheading">optional</p>
                <AutoComplete
                  options={locations}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      newLocation: selectedValue,
                    }));
                  }}
                />
              </div>
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
                <p>Starting Tag</p>
                <AutoComplete
                  options={tags}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      startingTag: selectedValue,
                    }));
                  }}
                />
              </div>

              <DatePicker dateTitle="Change Date" onChange={handleChange} name="changeDate" />
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

export default ChangeIPGP;
