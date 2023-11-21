import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState, useCallback } from "react";
import DatePicker from "../form-comps/datepicker";
import AutoComplete from "../../AutoComplete";
import WeightComp from "../form-comps/WeightComp";
import PlantWasteComponent from "../form-comps/PlantWasteComponent";

function PackagePW() {
  const [showOverlay, setShowOverlay] = useState(false);

  const [numPlants, setNumPlants] = useState(1);

  const handlePlantDataChange = useCallback((data, index) => {
    setFormData((prevData) => {
      const newPlantWasteItems = [...prevData.plantWasteItems];
      // Only update if data is different
      if (JSON.stringify(newPlantWasteItems[index]) !== JSON.stringify(data)) {
        newPlantWasteItems[index] = data;
        return { ...prevData, plantWasteItems: newPlantWasteItems };
      }
      // Return previous state if no change
      return prevData;
    });
  }, []); // Add dependencies if needed

  const [activeNote, setActiveNote] = useState("");
  const [formData, setFormData] = useState({
    newTag: "",
    location: "",
    item: "",
    quantity: "",
    packageDate: "",
    note: "",
    plantWasteItems: [],
  });

  //These need to be made dynamic
  const locations = ["BREEDING", "CLONE", "DRYING", "MOTHER", "VEGETATIVE"];

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

  const items = [
    "Apple Fritter Clones",
    "Forum Clones",
    "RAW Clones",
    "Runtz Clones",
  ];

  const quantityOptions = [
    "Each",
    "Fluid Ounces",
    "Gallons",
    "Grams",
    "Kilograms",
    "Liters",
    "Milligrams",
    "Milliliters",
    "Ounces",
    "Pints",
    "Quarts",
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
        <Form_header text="Package Plant Waste" />
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
              <div className="itm-container">
                <p>Quantity</p>
                <WeightComp
                  options={quantityOptions}
                  onChange={(data) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      quantity: data,
                    }));
                  }}
                />
              </div>
              <>
                <DatePicker
                  dateTitle="Package Date"
                  onChange={handleChange}
                  name="packageDate"
                />
              </>
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
              <div className="itm-container">
                <p>Plant Waste Items</p>
                <input
                  type="number"
                  value={numPlants}
                  onChange={(e) => {
                    const value = Math.max(
                      1,
                      Math.min(500, Number(e.target.value))
                    ); // Clamp the value between 1 and 500
                    setNumPlants(value);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                  min="1"
                  max="500" 
                  placeholder="500 max" // Set placeholder
                  className="number-input number-input-ppw" // Add a class for styling
                />
              </div>
              {numPlants > 0 && (
                <div className="plant-list">
                  <div className="itm-container plant-waste-header"></div>
                  {Array.from({ length: numPlants }, (_, index) => (
                    <PlantWasteComponent
                      key={index}
                      itemNumber={index + 1} // Pass the index + 1 as itemNumber
                      userPlaceholder="ex. 100"
                      onDataChange={(data) =>
                        handlePlantDataChange(data, index)
                      }
                    />
                  ))}
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

export default PackagePW;
