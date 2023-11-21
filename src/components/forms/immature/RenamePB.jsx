import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import AutoComplete from "../../AutoComplete";

function RenamePlantBatches() {
  const [formData, setFormData] = useState({
    sourceGroup: "",
    newGroupName: "",
  });

  //These need to be made dynamic
  const groupNames = ["B. Kush 5-30", "A. Kush 20-40", "C. Kush 80-160"];

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
        <Form_header text="Rename Plant Batches" />
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
                      sourceGroup: selectedValue,
                    }));
                  }}
                />
              </div>
              <div className="itm-container">
                <p>New Group Name</p>
                <input
                  type="text"
                  name="newGroupName"
                  placeholder="ex. B. Kush 5-30"
                  value={formData.newGroupName}
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
