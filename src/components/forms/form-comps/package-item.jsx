import "../template_form.css";
import AutoComplete from "../../AutoComplete";
import PropTypes from "prop-types";
import WeightComp from "../form-comps/WeightComp";
import DatePicker from "../form-comps/datepicker";

function PackageItem({ itemNumber, onDataChange }) {
  const newTags = [
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

  const items = [
    "Apple Fritter Clones",
    "Forum Clones",
    "RAW Clones",
    "Runtz Clones",
  ];

  const handleDataChange = (name, value) => {
    onDataChange(itemNumber, { [name]: value });
  };

  return (
    <div className="itm-container">
      <p>New Package #{itemNumber}</p>
      <div className="itm-container">
        <p>New Tag</p>
        <AutoComplete
          options={newTags}
          onChange={(selectedValue) =>
            handleDataChange("newTag", selectedValue)
          }
        />
      </div>
      <div className="itm-container">
        <p>Location</p>
        <AutoComplete
          options={locations}
          onChange={(selectedValue) =>
            handleDataChange("location", selectedValue)
          }
        />
      </div>
      <div className="itm-container">
        <p>Item</p>
        <AutoComplete
          options={items}
          onChange={(selectedValue) =>
            handleDataChange("item", selectedValue)
          }
        />
      </div>
      <div className="itm-container">
        <p>Weight</p>
        <WeightComp
          onChange={(weight) => handleDataChange("weight", weight)}
          options={["Grams", "Kilograms", "Milligrams", "Ounces", "Pounds"]}
        />
      </div>
      <div className="itm-container">
        <p>Drying Location</p>
        <AutoComplete
          options={locations}
          onChange={(selectedValue) =>
            handleDataChange("dryingLocation", selectedValue)
          }
        />
      </div>
      <div className="itm-container">
        <DatePicker
          onChange={(e) => handleDataChange("manicureDate", e.target.value)}
          dateTitle="Manicure Date"
          name="manicureDate"
        />
      </div>
    </div>
  );
}

PackageItem.propTypes = {
  itemNumber: PropTypes.number.isRequired,
  onDataChange: PropTypes.func.isRequired,
};

export default PackageItem;
