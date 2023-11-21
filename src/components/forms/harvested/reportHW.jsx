import "../template_form.css";
import Form_header from "../form-comps/form_header";
import { useState } from "react";
import AutoComplete from "../../AutoComplete";
import DatePicker from "../form-comps/datepicker";
import CustomDropdown from "../form-comps/CustomDropdown";
import WeightComp from "../form-comps/WeightComp";

function ReportHW() {
  const [formData, setFormData] = useState({
    harvestName: "",
    wasteType: "",
    weight: "",
    wasteDate: "",
  });
  //These need to be made dynamic
  const plantBatchToLocation = {
    "AF 02.10.2023": "RM1",
    "GR 02.10.2023": "RM2",
    "PBR 02.10.2023": "RM3",
    "RAW 02.10.2023": "RM1",
    "TT 02.10.2023": "RM3",
    "PJ 02.10.2023": "RM3",
  };

  const wasteTypes = [
    "MMJ Clone Waste",
    "MMJ Waste",
    "MMJ Waste (By Count)",
    "Rootballs, Stems, Fan leaves",
    "Waste",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Push formData to your backend
    console.log(formData);

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<pre>${JSON.stringify(formData, null, 2)}</pre>`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-wrap">
      <div className="form-container">
        <Form_header text="Report Harvest Waste" />
        <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="itm-list">
              <div className="itm-container">
                <p>Harvest Name</p>
                <AutoComplete
                  options={Object.keys(plantBatchToLocation)}
                  onChange={(selectedValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      harvestName: selectedValue,
                    }));
                  }}
                />
              </div>
              <>
                <CustomDropdown
                  text="Waste Type"
                  options={wasteTypes}
                  name="wasteType"
                  onChange={handleChange}
                />
              </>
              <div className="itm-container">
                <p>Weight</p>
                <WeightComp
                  onChange={(data) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      weight: data,
                    }));
                  }}
                />
              </div>
              <DatePicker
                dateTitle="Waste Date"
                onChange={handleChange}
                name="wasteDate"
              />
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

export default ReportHW;
