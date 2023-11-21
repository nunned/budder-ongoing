import { useState } from "react";
import PropTypes from "prop-types";
import "./Percentages.css"; // Import your CSS

function Percentages({ onIndicaChange, onSativaChange }) {
  const [indica, setIndica] = useState(100);
  const [sativa, setSativa] = useState(0);

  const handleIndicaChange = (e) => {
    const newIndica = parseInt(e.target.value, 10);
    setIndica(newIndica);
    setSativa(100 - newIndica);
    onIndicaChange(newIndica);
  };

  const handleSativaChange = (e) => {
    const newSativa = parseInt(e.target.value, 10);
    setSativa(newSativa);
    setIndica(100 - newSativa);
    onSativaChange(newSativa);
  };

  return (
    <div className="percentages-container">
      <div className="slider-container">
        <label>Indica: {indica}%</label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={indica}
          onChange={handleIndicaChange}
        />
      </div>
      <div className="slider-container">
        <label>Sativa: {sativa}%</label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={sativa}
          onChange={handleSativaChange}
        />
      </div>
    </div>
  );
}

Percentages.propTypes = {
  onIndicaChange: PropTypes.func.isRequired,
  onSativaChange: PropTypes.func.isRequired,
};

export default Percentages;
