// DashCard.js
import PropTypes from 'prop-types';
import '../../App.css';

function DashCard({ label, value, descriptor, icon }) {
  return (
    <div className="dash-card">
      <div className="dash-card-content">
        <div className="dash-card-text">
          <p className="dash-card-label">{label}</p>
          <h2 className="dash-card-value">{value}</h2>
          <p className="dash-card-descriptor">{descriptor}</p>
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
};

export default DashCard;
