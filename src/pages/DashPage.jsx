import PropTypes from "prop-types";
import "../App.css";
import LiveImage from "../assets/LiveImage.svg";
import arrowIcon from "../assets/sideArrow.svg";
import DashCard from "../components/dash-comps/DashCard";


function DashPage({ facility }) {
  // Extract the facility number from the facility string
  const facilityNumber = facility.match(/Facility (\d+)/);

  return (
    <div className="dash-page">
      <h1 className="facility-header">
        {facilityNumber ? `Facility ${facilityNumber[1]}` : "No Facility Selected"}
        {facilityNumber && <img src={LiveImage} alt="Live" className="live-icon" />}
      </h1>
      <DashCard label="Active Plants" value="2,690" descriptor="TOTAL" icon={arrowIcon} />
    </div>
  );
}

DashPage.propTypes = {
  facility: PropTypes.string,
};

export default DashPage;
