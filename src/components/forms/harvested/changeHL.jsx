import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import AutoComplete from "../../AutoComplete";
import DatePicker from "../form-comps/datepicker";

function ChangeHL() {
  const [formData, setFormData] = useState({
    harvestName: "",
    ogLocation: "",
    newLocation: "",
    moveDate: "",
  });
  //These need to be made dynamic
  const plantBatchToLocation = {
    "AF 02.10.2023": "RM1",
    "GR 02.10.2023": "RM2",
    "PBR 02.10.2023": "RM3",
    "RAW 02.10.2023": "RM1",
    "TT 02.10.2023": "RM3",
    "PJ 02.10.2023": "RM3",
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
        <Form_header text="Change Harvests Location" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Harvest Name</p>
                <AutoComplete
                  options={Object.keys(plantBatchToLocation)}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      harvestName: selectedValue,
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

export default ChangeHL;
