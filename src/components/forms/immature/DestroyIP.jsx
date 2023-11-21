import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import DatePicker from "../form-comps/datepicker";
import AutoComplete from "../../AutoComplete";
import CustomDropdown from "../form-comps/CustomDropdown";

function DestroyIP() {
  const [showOverlay, setShowOverlay] = useState(false);

  const [formData, setFormData] = useState({
    groupName: "",
    plantCount: "",
    reason: "",
    destroyDate: "",
    note: "",
  });

  const groupNames = ["B. Kush 5-30", "A. Kush 20-40", "C. Kush 80-160"];

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
    const wrappedNote = wrapNote(formData.note);
    setFormData((prev) => ({ ...prev, note: wrappedNote }));
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
        <Form_header text="Destroy Immature Plants" />
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
              <>
                <CustomDropdown
                  text="Reason"
                  options={reasons}
                  name="reason"
                  onChange={handleChange}
                />
              </>
              <DatePicker
                dateTitle="Destroy Date"
                onChange={handleChange}
                name="destroyDate"
              />
              <div className="itm-container">
                <p>Notes</p>
                <input
                  type="text"
                  name="note"
                  placeholder="Click to add notes..."
                  value={formData.note}
                  onClick={() => setShowOverlay(true)}
                  readOnly
                />
              </div>
              {showOverlay && (
                <div className="overlay">
                  <textarea
                    value={formData.note}
                    onChange={handleChange}
                    name="note"
                    rows="5"
                    cols="30"
                  ></textarea>
                  <button
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

export default DestroyIP;
