import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState, useEffect, useCallback } from "react";
import AutoComplete from "../../AutoComplete";
import HarvestPItem from "../form-comps/harvest-pItem";
import CustomDropdown from "../form-comps/CustomDropdown";

function CreateP() {
  const [formData, setFormData] = useState({
    sourceHarvest: "",
    newHarvest: "",
  });

  const [numPlants, setNumPlants] = useState(1);

  const handleHarvestItemDataChange = useCallback((itemNumber, data) => {
    setFormData((prevData) => {
      const newHarvestItems = [...(prevData.harvestItems || [])];
      newHarvestItems[itemNumber - 1] = {
        ...newHarvestItems[itemNumber - 1], // Spread existing data
        ...data, // Merge with incoming data
      };
      return { ...prevData, harvestItems: newHarvestItems };
    });
  }, []);

  useEffect(() => {
    setFormData((prevData) => {
      const newHarvestItems = (prevData.harvestItems || []).slice(0, numPlants);
      return { ...prevData, harvestItems: newHarvestItems };
    });
  }, [numPlants]);

  //These need to be made dynamic
  const harvestNames = ["AF 02.10.2023", "GR 02.10.2023", "PBR 02.10.2023"];

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
        <Form_header text="Create Packages" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Source Harvest</p>
                <AutoComplete
                  options={harvestNames}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      sourceHarvest: selectedValue,
                    }));
                  }}
                />
              </div>
              <div className="itm-container">
                <p>New Harvest Name</p>
                <input
                  type="text"
                  name="newHarvest"
                  placeholder=""
                  value={formData.newHarvest}
                  onChange={handleChange}
                />
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
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                    min="1"
                    max="500" // Set maximum value
                    placeholder="500 max" // Set placeholder
                    className="number-input" // Add a class for styling
                  />
                </div>
                {numPlants > 1 && (
                  <div className="template">
                  <h3 className="template-header">Template</h3>
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
                  </div>
                )}
                {numPlants > 0 && (
                  <div className="plant-list">
                    {Array.from({ length: numPlants }, (_, index) => (
                      <HarvestPItem
                        key={index}
                        itemNumber={index + 1} // Passing index + 1 as itemNumber
                        onDataChange={handleHarvestItemDataChange}
                      />
                    ))}
                  </div>
                )}
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

export default CreateP;
