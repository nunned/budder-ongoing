import PropTypes from "prop-types";
import "../template_form.css";
import WeightComp from "./WeightComp";
import AutoComplete from "../../AutoComplete";

const PackageComp = ({ itemNumber, onDataChange }) => {
  const packageNumbers = [
    "1A40E010001DBCB000000102",
    "1A40E010001DBCB000000103",
    "1A40E010001DBCB000000104",
    "1A40E010001DBCB000000105",
  ]; // Sample package numbers for autocomplete
  const unitOM = [
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
    "Pounds",
    "Quarts",
  ]; // Added more units for weight

  const handlePackageNumberChange = (selectedValue) => {
    onDataChange({ packageNumber: selectedValue });
  };

  const handleWeightChange = (data) => {
    onDataChange(data);
  };

  return (
    <div className="itm-container">
      <div className="itm-container">
        <p>Package #{itemNumber}</p>
        <AutoComplete
          options={packageNumbers}
          name="packageNumber"
          onChange={handlePackageNumberChange}
        />
      </div>
      <div className="itm-container">
        <p>Weight</p>
        <WeightComp options={unitOM} onChange={handleWeightChange} />
      </div>
    </div>
  );
};

PackageComp.propTypes = {
  itemNumber: PropTypes.number.isRequired,
  onDataChange: PropTypes.func.isRequired,
};

export default PackageComp;
