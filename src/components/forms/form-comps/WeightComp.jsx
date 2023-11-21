import { useState } from "react";
import CustomDropdown from "./CustomDropdown";
import "../template_form.css";
import PropTypes from "prop-types";

function WeightComp({ onChange, options, placeholder }) {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState(null);

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
    if (onChange) onChange({ weight: event.target.value, unit });
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
    if (onChange) onChange({ weight, unit: event.target.value });
  };

  return (
    <div className="itm-container weight-comp">
      <input
        type="number"
        value={weight}
        onChange={handleWeightChange}
        className="weight-input"
        placeholder={placeholder || "Weight"}
      />
      <div className="dropdown-container">
        <CustomDropdown
          options={options}
          name="unit"
          onChange={handleUnitChange}
        />
      </div>
    </div>
  );
}

WeightComp.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string, 
};

WeightComp.defaultProps = {
  options: ["Grams", "Kilograms", "Milligrams", "Ounces", "Pounds"], 
  placeholder: "Weight", 
};

export default WeightComp;
