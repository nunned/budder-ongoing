import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import AutoComplete from "../../AutoComplete";

function RenamePlantBatches() {
  const [formData, setFormData] = useState({
    sourceHarvest: "",
    newHarvest: "",
  });

  //These need to be made dynamic
  const harvestNames = ["AF 02.10.2023", "GR 02.10.2023", "PBR 02.10.2023"];

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
        <Form_header text="Rename Harvest" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Source Harvest</p>
                <AutoComplete
                  options={harvestNames}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      sourceHarvest: selectedValue,
                    }));
                  }}
                />
              </div>
              <div className="itm-container">
                <p>New Harvest Name</p>
                <input
                  type="text"
                  name="newHarvest"
                  //   placeholder="ex. AF 02.10.2023"
                  placeholder=""
                  value={formData.newHarvest}
                  onChange={handleChange}
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

export default RenamePlantBatches;
