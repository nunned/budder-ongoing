import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState, useCallback, useEffect } from "react";
import DatePicker from "../form-comps/datepicker";
import AutoComplete from "../../AutoComplete";
import PackageComp from "../form-comps/package-comp";

function NewPackage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeNote, setActiveNote] = useState("");
  const [numPlants, setNumPlants] = useState(1);
  const [isItemNull, setIsItemNull] = useState(false);

  const [formData, setFormData] = useState({
    newTag: "",
    location: "",
    item: "",
    packageDate: "",
    note: "",
    packageNums: Array(numPlants).fill({
      packageNumber: "",
      weight: "",
      unit: "",
    }),
  });

  const handlePackageDataChange = useCallback((itemNumber, data) => {
    setFormData((prevData) => {
      const newPackageNums = [...prevData.packageNums];
      newPackageNums[itemNumber] = {
        ...newPackageNums[itemNumber],
        ...data,
      };
      return { ...prevData, packageNums: newPackageNums };
    });
  }, []);

  useEffect(() => {
    setFormData((prevData) => {
      const newPackageNums = [...prevData.packageNums];
      while (newPackageNums.length < numPlants) {
        newPackageNums.push({ packageNumber: "", weight: "", unit: "" });
      }
      while (newPackageNums.length > numPlants) {
        newPackageNums.pop();
      }
      return { ...prevData, packageNums: newPackageNums };
    });
  }, [numPlants]);

  //These need to be made dynamic
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
        <Form_header text="Create New Package" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
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
                <label>
                  <input
                    type="checkbox"
                    checked={isItemNull}
                    onChange={(e) => {
                      setIsItemNull(e.target.checked);
                      if (e.target.checked) {
                        setFormData((prevData) => ({
                          ...prevData,
                          item: null,
                        }));
                      }
                    }}
                  />
                  Same Item
                </label>
              </div>
              {!isItemNull && (
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
              )}
              <DatePicker
                dateTitle="Package Date"
                onChange={handleChange}
                name="packageDate"
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
              <div className="itm-container">
                <p style={{ alignSelf: "center" }}>Number of Packages</p>
                <input
                  type="number"
                  value={numPlants}
                  onChange={(e) => setNumPlants(Number(e.target.value))}
                  onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} // Prevent form submission on Enter
                  min="1"
                  max="150"
                  className="number-input" // Add a class for styling
                />
              </div>
              <div className="plant-list">
                {Array.from({ length: numPlants }, (_, index) => (
                  <PackageComp
                    key={index}
                    itemNumber={index + 1}
                    onDataChange={(data) =>
                      handlePackageDataChange(index, data)
                    }
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

export default NewPackage;
