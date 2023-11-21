import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import DatePicker from "../form-comps/datepicker";
import AutoComplete from "../../AutoComplete";
import CustomDropdown from "../form-comps/CustomDropdown";

function DestroyFP() {
  const [showOverlay, setShowOverlay] = useState(false);

  const [formData, setFormData] = useState({
    sourceTag: "",
    destroyDate: "",
    reason: "",
    destroyNote: "",
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

  const reasons = [
    "Beginning Inventory Reconciliation",
    "Damage/Spoilage",
    "Disease/Infestation",
    "Male Plant",
    "Mandatory State Destruction",
    "Mother Plant Destruction",
    "Trimming/Pruning",
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
    const wrappedNote = wrapNote(formData.destroyNote);
    setFormData((prev) => ({ ...prev, destroyNote: wrappedNote }));
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
        <Form_header text="Destroy Flowering Plants" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Source Tag</p>
                <AutoComplete
                  options={sourceTags}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      sourceTag: selectedValue,
                    }));
                  }}
                />
              </div>
              <DatePicker
                dateTitle="Destroy Date"
                onChange={handleChange}
                name="destroyDate"
              />
              <>
                <CustomDropdown
                  text="Reason"
                  options={reasons}
                  name="reason"
                  onChange={handleChange}
                />
              </>
              <div className="itm-container">
                <p>Notes</p>
                <input
                  type="text"
                  name="destroyNote"
                  placeholder="Click to add notes..."
                  value={formData.destroyNote}
                  onClick={() => setShowOverlay(true)}
                  readOnly
                />
              </div>
              {showOverlay && (
                <div className="overlay">
                  <textarea
                    value={formData.destroyNote}
                    onChange={handleChange}
                    name="destroyNote"
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

export default DestroyFP;
