import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import DatePicker from "../form-comps/datepicker";
import AutoComplete from "../../AutoComplete";

function FloweringPCBL() {
  const [formData, setFormData] = useState({
    sourceLocation: "",
    newPhase: "vegetative",
    newLocation: "",
    changeDate: "",
  });

  //These need to be made dynamic

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
        <Form_header text="Flowering Plants Changes by Location" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container custom-header">
                <p>Changing Phase to Vegetative</p>
              </div>
              <div className="itm-container">
                <p>Source Location</p>
                <AutoComplete
                  options={locations}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      sourceLocation: selectedValue,
                    }));
                  }}
                />
              </div>
              <DatePicker
                dateTitle="Change Date"
                onChange={handleChange}
                name="changeDate"
              />
              <div className="itm-container">
                <p>New Location</p>
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

export default FloweringPCBL;
