import { useState } from "react";
import PropTypes from "prop-types";
import "./CustomChecklist.css"; // You need to create and import the CSS file

function CustomChecklist({ options, name, onChange, text = null }) {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = { ...prevSelectedOptions, [option]: !prevSelectedOptions[option] };
      onChange({ target: { name, value: newSelectedOptions } });
      return newSelectedOptions;
    });
  };

  return (
    <div className="custom-checklist">
      {text && <div className="checklist-header">{text}</div>}
      <div className="checklist-options">
        {options.map((option, index) => (
          <div key={index} className="checklist-option">
            <input
              type="checkbox"
              id={`${name}-${index}`}
              checked={!!selectedOptions[option]}
              onChange={() => handleOptionChange(option)}
            />
            <label htmlFor={`${name}-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

CustomChecklist.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default CustomChecklist;
