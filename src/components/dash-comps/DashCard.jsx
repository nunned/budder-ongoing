// DashCard.js
import PropTypes from "prop-types";
import "../../App.css";

function DashCard({ label, value, descriptor, icon, onClick }) {
  return (
    <div className="dash-card" onClick={onClick}>
      <div className="dash-card-content">
        <div className="dash-card-text">
          <p className="dash-card-label">{label}</p>
          <div className="hor-group">
            <h2 className="dash-card-value">{value}</h2>
            <p className="dash-card-descriptor">{descriptor}</p>
          </div>
        </div>
        <img src={icon} alt="arrow icon" className="dash-card-icon" />
      </div>
    </div>
  );
}

DashCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  descriptor: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default DashCard;
