import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import DatePicker from "../form-comps/datepicker";
import AutoComplete from "../../AutoComplete";
import CustomDropdown from "../form-comps/CustomDropdown";

function RemediateP() {
  const [showOverlay, setShowOverlay] = useState(false);

  const [formData, setFormData] = useState({
    sourcePack: "",
    remDate: "",
    method: "",
    remSteps: "",
  });

  //These need to be made dynamic
  const sourcePacks = [
    "Package #1",
    "Package #2",
    "Package #3",
    "Package #4",
    "Package #5",
    "Package #6",
    "Package #7",
    "Package #8",
    "Package #9",
    "Package #10",
  ];

  const methods = [
    "Decontamination",
    "Extraction",
    "Further Drying",
    "High Heat / Hydro-Carbon Based Solvent",
    "Non-solvent Processing",
    "Re-Package / Re-Mix",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const wrapNote = (note) => {
    return note.split("").reduce((acc, char, idx) => {
      if (idx % 50 === 0 && idx !== 0) {
        return acc + "\n" + char;
      }
      return acc + char;
    }, "");
  };

  const handleNoteSubmit = () => {
    const wrappedNote = wrapNote(formData.remSteps);
    setFormData((prev) => ({ ...prev, remSteps: wrappedNote }));
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
        <Form_header text="Remediate Package" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Source Package</p>
                <AutoComplete
                  options={sourcePacks}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      sourcePack: selectedValue,
                    }));
                  }}
                />
              </div>
              <>
                <CustomDropdown
                  text="Method"
                  options={methods}
                  name="method"
                  onChange={handleChange}
                />
              </>
              <div className="itm-container">
                <p>Remediation Steps</p>
                <input
                  type="text"
                  name="remSteps"
                  placeholder="Click to add notes..."
                  value={formData.remSteps}
                  onClick={() => setShowOverlay(true)}
                  readOnly
                />
              </div>
              {showOverlay && (
                <div className="overlay">
                  <textarea
                    value={formData.remSteps}
                    onChange={handleChange}
                    name="remSteps"
                    rows="5"
                    cols="30"
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => {
                      handleNoteSubmit();
                      setShowOverlay(false);
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
              <DatePicker
                dateTitle="Destroy Date"
                onChange={handleChange}
                name="remDate"
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

export default RemediateP;
