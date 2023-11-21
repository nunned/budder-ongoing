import chatlogo from "../../../assets/chatlogo.png";
import PropTypes from "prop-types";
import minimize from "../../../assets/minimize.svg";
import "./form_header.css";

const Form_header = ({ text = "bot", subText = "" }) => {
  return (
    <div className="wrap">
      <div className="form-top">
        <div className="top-top">
          <img src={chatlogo} alt="Chat Logo" className="form-logo" />
          <p className="budder">BUDDER</p>
        </div>
        <img src={minimize} alt="Minimize Icon" className="minimize" />
      </div>
      <div className="form-bot">{text}</div>
      {subText && <div className="form-subheader">{subText}</div>} 
    </div>
  );
};

Form_header.propTypes = {
  text: PropTypes.string,
  subText: PropTypes.string, // Added new prop for subheader text
};

export default Form_header;
