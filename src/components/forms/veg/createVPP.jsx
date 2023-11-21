import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState, useEffect, useCallback } from "react";
import DatePicker from "../form-comps/datepicker";
import AutoComplete from "../../AutoComplete";
import PlantNumComp from "../form-comps/PlantNumComp";

function CreateVPP() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeNote, setActiveNote] = useState("");
  const [numPlants, setNumPlants] = useState(1);

  const [formData, setFormData] = useState({
    newTag: "",
    location: "",
    item: "",
    plantDate: "",
    note: "",
    plantNums: [],
  });

  const handlePlantDataChange = useCallback((data, index) => {
    setFormData((prevData) => {
      const newPlantNums = [...prevData.plantNums];
      newPlantNums[index] = data.sourceTag; // Only store the sourceTag value
      return { ...prevData, plantNums: newPlantNums };
    });
  }, []);

  useEffect(() => {
    setFormData((prevData) => {
      const newPlantNums = prevData.plantNums.slice(0, numPlants);
      return { ...prevData, plantNums: newPlantNums };
    });
  }, [numPlants]);

  //These need to be made dynamic
  const tags = [
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
        <Form_header text="Create Vegetative Plants Package" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>New Tag</p>
                <AutoComplete
                  options={tags}
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
              <DatePicker
                dateTitle="Planting Date"
                onChange={handleChange}
                name="plantDate"
              />
              <div className="itm-container">
                <p>Note</p>
                <input
                  type="text"
                  name="note"
                  placeholder="Click to add notes..."
                  value={formData.note}
                  onClick={() => {
                    setShowOverlay(true);
                    setActiveNote("note");
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
              <div className="plant-list">
                <div className="itm-container">
                  <p>Number of Plants</p>
                  <input
                    type="number"
                    value={numPlants}
                    onChange={(e) => setNumPlants(Number(e.target.value))}
                    onKeyPress={(e) => e.key === "Enter" && e.preventDefault()} // Prevent form submission on Enter
                    min="1"
                    max="150"
                    className="number-input" // Add a class for styling
                  />
                </div>
                {Array.from({ length: numPlants }, (_, index) => (
                  <PlantNumComp
                    key={index}
                    itemNumber={index + 1}
                    onDataChange={(data) => handlePlantDataChange(data, index)}
                  />
                ))}
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

export default CreateVPP;
