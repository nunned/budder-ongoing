import PropTypes from "prop-types";
import "../../App.css";

function DashCard({ label, value, descriptor, icon, onClick, className }) {
  // Combine the default class with any additional classes passed
  const cardClass = `dash-card ${className || ''}`.trim();

  return (
    <div className={cardClass} onClick={onClick}>
      <div className="dash-card-content">
        <div className="dash-card-text">
          <p className="dash-card-label">{label}</p>
          <div className="hor-group">
            <h2 className="dash-card-value">{value}</h2>
            <p className="dash-card-descriptor">{descriptor}</p>
          </div>
        </div>
        {icon && <img src={icon} alt="icon" className="dash-card-icon" />}
      </div>
    </div>
  );
}

DashCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  descriptor: PropTypes.string.isRequired,
  icon: PropTypes.string, // icon is now optional
  onClick: PropTypes.func,
  className: PropTypes.string, // Add className to propTypes
};

export default DashCard;
