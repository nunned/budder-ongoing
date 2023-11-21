import "../template_form.css";
import AutoComplete from "../../AutoComplete";
import PropTypes from "prop-types";
import WeightComp from "../form-comps/WeightComp";

function HarvestPItem({ itemNumber, onDataChange }) {
  const harvestName = ["AF 02.10.2023", "GR 02.10.2023", "PBR 02.10.2023"];

  const handleDataChange = (name, value) => {
    onDataChange(itemNumber, { [name]: value });
  };

  return (
    <div className="itm-container">
      <p>Harvest Item #{itemNumber}</p>
      <div className="itm-container">
        <p>Harvest Name</p>
        <AutoComplete
          options={harvestName}
          onChange={(selectedValue) =>
            handleDataChange("harvestName", selectedValue)
          }
        />
      </div>
      <div className="itm-container">
        <p>Quantity</p>
        <WeightComp
          onChange={(weight) => handleDataChange("weight", weight)}
          options={["Grams", "Kilograms", "Milligrams", "Ounces", "Pounds"]}
        />
      </div>
    </div>
  );
}

HarvestPItem.propTypes = {
  itemNumber: PropTypes.number.isRequired,
  onDataChange: PropTypes.func.isRequired,
};

export default HarvestPItem;
