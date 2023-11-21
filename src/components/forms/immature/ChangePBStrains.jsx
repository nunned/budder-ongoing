import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import AutoComplete from "../../AutoComplete";

function ChangePBStrains() {
  const [formData, setFormData] = useState({
    plantBatch: "",
    ogStrain: "",
    newStrain: "",
  });

  //These need to be made dynamic
  const plantBatchToStrain = {
    "Plant Batch #1": "Apple Fritter",
    "Plant Batch #2": "RAW",
    "Plant Batch #3": "Forum",
    "Plant Batch #4": "Runtz",
  };

  const plantBatches = [
    "Plant Batch #1",
    "Plant Batch #2",
    "Plant Batch #3",
    "Plant Batch #4",
  ];

  const strains = ["Apple Fritter", "RAW", "Forum", "Runtz"];

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
        <Form_header text="Change Plant Batches Strains" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Group Name</p>
                <AutoComplete
                  options={plantBatches}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      plantBatch: selectedValue,
                      ogStrain: plantBatchToStrain[selectedValue],
                    }));
                  }}
                />
              </div>
              <div className="itm-container">
                <p>Original Strain</p>
                <p className="prefill-textarea">{formData.ogStrain}</p>
              </div>
              <div className="itm-container">
                <p>New Strain</p>
                <AutoComplete
                  options={strains}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      newStrain: selectedValue,
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

export default ChangePBStrains;
