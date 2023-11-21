import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState, useEffect, useCallback } from "react";
import AutoComplete from "../../AutoComplete";
import WeightComp from "../form-comps/WeightComp";
import DatePicker from "../form-comps/datepicker";
import ManicureItem from "../form-comps/manicure-item";
import CustomDropdown from "../form-comps/CustomDropdown";

function ManicureVP() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeNote, setActiveNote] = useState("");
  const [numPlants, setNumPlants] = useState(1);
  const [mode, setMode] = useState("single");
  const [formData, setFormData] = useState({
    sourceTag: "",
    harvestName: "",
    weight: "",
    dryingLocation: "",
    manicureDate: "",
    manicureItems: [], // Added this for multi mode
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

  const locations = ["BREEDING", "CLONE", "DRYING", "MOTHER", "VEGETATIVE"];

  const handleManicureItemDataChange = useCallback((itemNumber, data) => {
    setFormData((prevData) => {
      const newManicureItems = [...(prevData.manicureItems || [])]; 
      newManicureItems[itemNumber - 1] = {
        ...newManicureItems[itemNumber - 1],
        ...data,
      };
      return { ...prevData, manicureItems: newManicureItems }; 
    });
  }, []);

  useEffect(() => {
    setFormData((prevData) => {
      const newManicureItems = (prevData.manicureItems || []).slice(0, numPlants);
      return { ...prevData, manicureItems: newManicureItems };
    });
  }, [numPlants]);

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

    let finalFormData = { ...formData };

    if (mode === "multi") {
      delete finalFormData.sourceTag;
      delete finalFormData.weight;
      delete finalFormData.harvestName;
      delete finalFormData.dryingLocation;
      delete finalFormData.manicureDate;
    }

    // TODO: Push finalFormData to your backend
    console.log(finalFormData);

    const newWindow = window.open("", "_blank");
    newWindow.document.write(
      `<pre>${JSON.stringify(finalFormData, null, 2)}</pre>`
    );
  };

  return (
    <div className="form-wrap">
      <div className="form-container">
        <Form_header text="Manicure Vegetative Plants" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container toggle-container">
                <div className="custom-radio">
                  <input
                    type="radio"
                    value="single"
                    id="single"
                    checked={mode === "single"}
                    onChange={(e) => setMode(e.target.value)}
                  />
                  <label htmlFor="single">Single</label>
                </div>
                <div className="custom-radio">
                  <input
                    type="radio"
                    value="multi"
                    id="multi"
                    checked={mode === "multi"}
                    onChange={(e) => setMode(e.target.value)}
                  />
                  <label htmlFor="multi">Multi</label>
                </div>
              </div>

              {mode === "single" && (
                <div className="itm-container">
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
                  <div className="itm-container">
                    <p>Harvest Name</p>
                    <input
                      type="text"
                      name="harvestName"
                      placeholder="Click to add notes..."
                      value={formData.harvestName}
                      onClick={() => {
                        setShowOverlay(true);
                        setActiveNote("harvestName");
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
                    <p>Weight</p>
                    <WeightComp
                      onChange={(data) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          weight: data,
                        }));
                      }}
                    />
                  </div>
                  <div className="itm-container">
                    <p>Drying Location</p>
                    <AutoComplete
                      options={locations}
                      onChange={(selectedValue) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          dryingLocation: selectedValue,
                        }));
                      }}
                    />
                  </div>
                  <DatePicker
                    dateTitle="Manicure Date"
                    onChange={handleChange}
                    name="harvestDate"
                  />
                </div>
              )}
              {mode === "multi" && (
                <div className="itm-container multi-mode-container">
                  <div className="template-section">
                    <h2>Template</h2>
                    <div className="itm-container">
                      <p>Harvest Name</p>
                      <input
                        type="text"
                        name="harvestName"
                        placeholder="Click to add notes..."
                        value={formData.harvestName}
                        onClick={() => {
                          setShowOverlay(true);
                          setActiveNote("harvestName");
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
                    <div className="itm-container ">
                      <CustomDropdown
                        text="Unit of Measure"
                        options={[
                          "Grams",
                          "Kilograms",
                          "Milligrams",
                          "Ounces",
                          "Pounds",
                        ]}
                        name="unitofmeasure"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="itm-container">
                      <p>Drying Location</p>
                      <AutoComplete
                        options={locations}
                        onChange={(selectedValue) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            dryingLocation: selectedValue,
                          }));
                        }}
                      />
                    </div>
                    <div className="itm-container">
                      <DatePicker
                        dateTitle="Manicure Date"
                        onChange={handleChange}
                        name="manicureDate"
                      />
                    </div>
                  </div>

                  <div className="number-of-plants-section">
                    <h2>Number of Plants</h2>
                    <div className="itm-container">
                      <p>Number of Plants</p>
                      <input
                        type="number"
                        value={numPlants}
                        onChange={(e) => {
                          const value = Math.max(
                            0,
                            Math.min(500, Number(e.target.value))
                          ); // Clamp the value between 0 and 500
                          setNumPlants(value);
                        }}
                        onKeyDown={(e) =>
                          e.key === "Enter" && e.preventDefault()
                        }
                        min="1"
                        max="500" 
                        placeholder="500 max" 
                        className="number-input" 
                      />
                    </div>
                    {numPlants > 0 && (
                      <div className="plant-list">
                        {Array.from({ length: numPlants }, (_, index) => (
                          <ManicureItem 
                            key={index}
                            itemNumber={index + 1}
                            onDataChange={handleManicureItemDataChange} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
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

export default ManicureVP;
