import { useState } from "react";
import PropTypes from "prop-types";
import "./datepicker.css";
import downarrow from "../../../assets/downarrow.svg";

function DatePicker({
  onChange,
  dateTitle = "Planting Date",
  name = "dateValue",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    onChange({ target: { value: event.target.value, name: name } });
  };

  const selectToday = () => {
    const today = new Date().toISOString().split("T")[0]; // Gets the date in "YYYY-MM-DD" format
    setSelectedDate(today);
    onChange({ target: { value: today, name: name } });
    setIsOpen(false);
  };

  return (
    <div className="date-picker">
      <div className="date-title">{dateTitle}</div>
      <div className="date-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedDate || "Select Date"}
        <img src={downarrow} alt="down arrow" className="down-arrow-icon" />
      </div>
      {isOpen && (
        <div className="date-options">
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          <button onClick={selectToday}>Today</button>
        </div>
      )}
    </div>
  );
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  dateTitle: PropTypes.string,
  name: PropTypes.string,
};

export default DatePicker;
