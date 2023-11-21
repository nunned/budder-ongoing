import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState, useCallback } from "react";
import StrainComp from "../form-comps/strain-comp"; // Import StrainComp

function AddStrains() {
  const [numStrains, setNumStrains] = useState(1);

  const [formData, setFormData] = useState({
    strains: [],
  });

  const handleStrainDataChange = useCallback((itemNumber, data) => {
    setFormData((prevData) => {
      const newStrains = [...prevData.strains];
      newStrains[itemNumber - 1] = data; // Store the entire data object
      return { ...prevData, strains: newStrains };
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<pre>${JSON.stringify(formData, null, 2)}</pre>`);
  };

  return (
    <div className="form-wrap">
      <div className="form-container">
        <Form_header text="Add Strains" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Number of Strains</p>
                <input
                  type="number"
                  value={numStrains}
                  onChange={(e) =>
                    setNumStrains(
                      Math.max(0, Math.min(500, Number(e.target.value)))
                    )
                  }
                  min="1"
                  max="500"
                  placeholder="500 max"
                  className="number-input"
                />
              </div>
              {numStrains > 0 && (
                <div className="plant-list">
                  {Array.from({ length: numStrains }, (_, index) => (
                    <StrainComp
                      key={index}
                      itemNumber={index + 1}
                      onDataChange={handleStrainDataChange}
                    />
                  ))}
                </div>
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

export default AddStrains;
