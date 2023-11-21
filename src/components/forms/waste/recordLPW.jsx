import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import DatePicker from "../form-comps/datepicker";
import AutoComplete from "../../AutoComplete";
import CustomDropdown from "../form-comps/CustomDropdown";
import WeightComp from "../form-comps/WeightComp";

function RecordLPW() {
    const [showOverlay, setShowOverlay] = useState(false);

  const [activeNote, setActiveNote] = useState("");
  const [formData, setFormData] = useState({
    location: "",
    wasteMethod: "",
    materialMixed: "",
    wasteWeight: "",
    reason: "",
    optionalNote: "",
    wasteDate: "",
  });

  //These need to be made dynamic
  const locations = ["BREEDING", "CLONE", "DRYING", "MOTHER", "VEGETATIVE"];

  const reasons = [
    "Beginning Inventory Reconciliation",
    "Damage/Spoilage",
    "Disease/Infestation",
    "Male Plant",
    "Mandatory State Destruction",
    "Mother Plant Destruction",
    "Trimming/Pruning",
  ];
  const wasteMethods = [
    "Burn",
    "Compost",
    "Made Uncrecognizable & Unusable",
    "Waste Disposal Transfer",
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

  const handleNoteSubmit = (noteName) => {
    const wrappedNote = wrapNote(formData[noteName]);
    setFormData((prev) => ({ ...prev, [noteName]: wrappedNote }));
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
        <Form_header text="Record Plant Batches Waste" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Location</p>
                <AutoComplete
                  options={locations}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      location: selectedValue,
                    }));
                  }}
                />
              </div>
              <>
                <CustomDropdown
                  text="Waste Method"
                  options={wasteMethods}
                  name="wasteMethod"
                  onChange={handleChange}
                />
              </>
              <div className="itm-container">
                <p>Material Mixed</p>
                <input
                  type="text"
                  name="materialMixed"
                  placeholder="Click to add notes..."
                  value={formData.materialMixed}
                  onClick={() => {
                    setShowOverlay(true);
                    setActiveNote("materialMixed");
                  }}
                  readOnly
                />
              </div>
              {showOverlay && (
                <div className="overlay">
                  <textarea
                    value={formData[activeNote]}
                    onChange={handleChange}
                    name={activeNote}
                    rows="5"
                    cols="30"
                  ></textarea>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      handleNoteSubmit(activeNote);
                      setShowOverlay(false);
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
              <div className="itm-container">
                <p>Waste Weight</p>
                <WeightComp
                  onChange={(data) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      wasteWeight: data,
                    }));
                  }}
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
              <div className="itm-container">
                <p>Optional Note</p>
                <input
                  type="text"
                  name="optionalNote"
                  placeholder="Click to add notes..."
                  value={formData.optionalNote}
                  onClick={() => {
                    setShowOverlay(true);
                    setActiveNote("optionalNote");
                  }}
                  readOnly
                />
              </div>
              {showOverlay && (
                <div className="overlay">
                  <textarea
                    value={formData[activeNote]}
                    onChange={handleChange}
                    name={activeNote}
                    rows="5"
                    cols="30"
                  ></textarea>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      handleNoteSubmit(activeNote);
                      setShowOverlay(false);
                    }}
                  >
                    Done
                  </button>
                </div>
              )}

              <DatePicker
                dateTitle="Waste Date"
                onChange={handleChange}
                name="wasteDate"
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


export default RecordLPW;
