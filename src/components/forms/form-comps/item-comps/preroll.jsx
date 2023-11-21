import PropTypes from "prop-types";
import "../../template_form.css";
import CustomDropdown from "../../form-comps/CustomDropdown";
import WeightComp from "../WeightComp";
import AutoComplete from "../../../AutoComplete";

const PreRoll = ({ onDataChange }) => {
  const unitOM = ["Each"];
  const strains = ["Apple Fritter", "RAW", "Forum", "Runtz"];

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    onDataChange(name, value); // You might want to pass the entire formData object if necessary
  };

  const handleWeightChange = (data) => {
    
    onDataChange("weight", data.weight);
    onDataChange("weightUnit", data.unit);
  };

  return (
    <div className="itm-container">
      <div className="itm-container">
        <CustomDropdown
          text="Unit of Measure"
          options={unitOM}
          name="unitOfMeasure"
          onChange={handleChange} // Ensure CustomDropdown calls onChange with event object
        />
      </div>
      <div className="itm-container">
        <p>Strain</p>
        <AutoComplete
          options={strains}
          name="strain"
          onChange={handleChange}
        />
      </div>
      <div className="itm-container">
        <p>Unit Weight</p>
        <WeightComp options={unitOM} onChange={handleWeightChange} />
      </div>
    </div>
  );
};

PreRoll.propTypes = {
  onDataChange: PropTypes.func.isRequired,
};

export default PreRoll;
