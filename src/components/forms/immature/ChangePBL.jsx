import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import AutoComplete from "../../AutoComplete";
import DatePicker from "../form-comps/datepicker";

function ChangePBLocation() {
  const [formData, setFormData] = useState({
    plantGroupName: "",
    ogLocation: "",
    newLocation: "",
    moveDate: "",
  });
  //These need to be made dynamic
  const plantBatchToLocation = {
    "Plant Batch #1": "BREEDING",
    "Plant Batch #2": "BREEDING",
    "Plant Batch #3": "CLONE",
    "Plant Batch #4": "MOTHER",
    "Plant Batch #5": "VEGETATIVE",
    "Plant Batch #6": "DRYING",
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
        <Form_header text="Change Plant Batches Location" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Group Name</p>
                <AutoComplete
                  options={Object.keys(plantBatchToLocation)}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      plantGroupName: selectedValue,
                      ogLocation: plantBatchToLocation[selectedValue],
                    }));
                  }}
                />
              </div>
              <div className="itm-container">
                <p>Original Location</p>
                <p className="prefill-textarea">{formData.ogLocation}</p>
              </div>
              <div className="itm-container">
                <p>New Location</p>
                <AutoComplete
                  options={Object.values(plantBatchToLocation)}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      newLocation: selectedValue,
                    }));
                  }}
                />
              </div>
              <DatePicker
                dateTitle="Move Date"
                onChange={handleChange}
                name="moveDate"
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

export default ChangePBLocation;
