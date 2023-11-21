import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import DatePicker from "../form-comps/datepicker";
import AutoComplete from "../../AutoComplete";

function CreateImmPlantPackages() {
  const [showOverlay, setShowOverlay] = useState(false);

  const [formData, setFormData] = useState({
    groupName: "",
    newTag: "",
    location: "",
    item: "",
    packageDate: "",
    plantCount: "",
    note: "",
  });

  const groupNames = ["B. Kush 5-30", "A. Kush 20-40", "C. Kush 80-160"];

  //Type="Medical Package", Status="Received",Comissioned="05/20/2022 12:50 am"
  const newTags = [
    "1A40E0100019269000000064",
    "1A40E0100019269000000065",
    "1A40E0100019269000000066",
    "1A40E0100019269000000067",
    "1A40E0100019269000000068",
    "1A40E0100019269000000069",
    "1A40E0100019269000000070",
    "1A40E0100019269000000071",
    "1A40E0100019269000000072",
    "1A40E0100019269000000073",
  ];

  const locations = ["BREEDING", "CLONE", "DRYING", "MOTHER", "VEGETATIVE"];

  const items = [
    "Apple Fritter Clones",
    "Forum Clones",
    "RAW Clones",
    "Runtz Clones",
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
        <Form_header text="Create Immature Plants Packages" />
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
                <p>New Tag</p>
                <AutoComplete
                  options={newTags}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      newTag: selectedValue,
                    }));
                  }}
                />
              </div>
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
              <div className="itm-container">
                <p>Item</p>
                <AutoComplete
                  options={items}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      item: selectedValue,
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
              <DatePicker
                dateTitle="Package Date"
                onChange={handleChange}
                name="packageDate"
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

export default CreateImmPlantPackages;
