import { useState } from "react";
import "../template_form.css";
import Form_header from "../form-comps/form_header";
import CustomDropdown from "../form-comps/CustomDropdown";
import AutoComplete from "../../AutoComplete";
import FlowerBuds from "../form-comps/item-comps/flowerbuds";
import ImmPlants from "../form-comps/item-comps/immPlant";
import Kief from "../form-comps/item-comps/kief";
import MaturePlants from "../form-comps/item-comps/maturePlant";
import MMJCloneWaste from "../form-comps/item-comps/mmjclonewaste";
import MMJWaste from "../form-comps/item-comps/mmjwaste";
import MMJWastebc from "../form-comps/item-comps/mmjwastebc";
import PreRoll from "../form-comps/item-comps/preroll";
import Seeds from "../form-comps/item-comps/seeds";
import ShakeTrim from "../form-comps/item-comps/shaketrim";
import ShakeTrimByStrain from "../form-comps/item-comps/shaketrimbs";
import WholeWetPlant from "../form-comps/item-comps/wholewp";

// TODO autofill category when item is selected
const categoryDict = {
  "Flower & Buds": FlowerBuds,
  "Immature Plants": ImmPlants,
  Kief: Kief,
  "Mature Plants": MaturePlants,
  "MMJ Clone Waste": MMJCloneWaste,
  "MMJ Waste": MMJWaste,
  "MMJ Waste (by Count)": MMJWastebc,
  "Pre-Roll (Flower Only)": PreRoll,
  Seeds: Seeds,
  "Shake/Trim": ShakeTrim,
  "Shake/Trim (by Strain)": ShakeTrimByStrain,
  "Whole Wet Plant": WholeWetPlant,
};

const items = [
    "Apple Fritter Clones",
    "Forum Clones",
    "RAW Clones",
    "Runtz Clones",
  ];

function EditItem() {
  const [formData, setFormData] = useState({
    ogItemName: "",
    itemType: "",
    unitOfMeasure: "",
  });

  const handleDataChange = (name, value) => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "itemType") {
      // Reset formData when itemType changes
      setFormData({
        itemName: formData.itemName, // retain the itemName
        itemType: value, // set the new itemType
        // ... any other default values you want to retain
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const SelectedComponent = categoryDict[formData.itemType];

  return (
    <div className="form-wrap">
      <div className="form-container">
        <Form_header text="Edit Item" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
            <div className="itm-container">
                <p>Original Item Name</p>
                <AutoComplete
                  options={items}
                  name="ogItemName"
                  onChange={handleChange}
                />
              </div>
              <div className="itm-container">
                <CustomDropdown
                  text="Item Type"
                  options={Object.keys(categoryDict)}
                  name="itemType"
                  onChange={handleChange}
                />
              </div>
              {SelectedComponent && (
                <SelectedComponent onDataChange={handleDataChange} />
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

export default EditItem;
