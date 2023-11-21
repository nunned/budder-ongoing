import "../template_form.css";
import WeightComp from "./WeightComp";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AutoComplete from "../../AutoComplete";

function PlantWasteComponent({ itemNumber, userPlaceholder, onDataChange }) {
  const [formData, setFormData] = useState({
    plantWasteNum: "",
    quantity: "",
  });

  useEffect(() => {
    onDataChange(formData); // Pass the data up whenever it changes
  }, [formData, onDataChange]);

  const wasteNums = [
    "0004471741",
    "0004471742",
    "0004471743",
    "0004471744",
    "0004471745",
    "0004471746",
    "0004471747",
    "0004471748",
    "0004471749",
    "0004471750",
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

  const handlePlantWasteChange = (selectedValue) => {
    setFormData((prevData) => ({
      ...prevData,
      plantWasteNum: selectedValue,
    }));
  };

  const handleQuantityChange = (quantityData) => {
    setFormData((prevData) => ({
      ...prevData,
      quantity: quantityData,
    }));
  };

  return (
    <div className="itm-container plant-waste-component">
      <p>Plant Waste #{itemNumber}</p>
      <AutoComplete options={wasteNums} onChange={handlePlantWasteChange} />
      <WeightComp
        onChange={handleQuantityChange}
        options={quantityOptions}
        placeholder={userPlaceholder}
      />
    </div>
  );
}

PlantWasteComponent.propTypes = {
  itemNumber: PropTypes.number.isRequired,
  userPlaceholder: PropTypes.string.isRequired,
  onDataChange: PropTypes.func.isRequired,
};

export default PlantWasteComponent;
