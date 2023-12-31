import PropTypes from "prop-types";
import "../App.css";
import LiveImage from "../assets/LiveImage.svg";
import arrowIcon from "../assets/sideArrow.svg";
import DashCard from "../components/dash-comps/DashCard";
import DashCarousel from "../components/Carousel/DashCarousel";
import { useNavigate } from "react-router-dom";

function DashPage({ facility }) {
  // Extract the facility number from the facility string
  const facilityNumber = facility.match(/Facility (\d+)/);
  const navigate = useNavigate();
  const dashItems = [
    {
      action: "Changed Growth Phase",
      user: "User1",
      timeAgo: "1m ago",
    },
    {
      action: "Destroyed",
      user: "User2",
      timeAgo: "2m ago",
    },
    {
      action: "Created",
      user: "User3",
      timeAgo: "3m ago",
    },
    {
      action: "Moved",
      user: "User4",
      timeAgo: "4m ago",
    },
    // ... more items
  ].map((item, index) => (
    <div key={index} className="dash-item">
      <div className="dash-item-action">{item.action}</div>
      <div className="dash-item-user">{item.user}</div>
      <div className="dash-item-time">{item.timeAgo}</div>
    </div>
  ));

  const packageItems = [
    {
      action: "Changed Growth Phase",
      user: "User1",
      timeAgo: "5m ago",
    },
    {
      action: "Destroyed",
      user: "User2",
      timeAgo: "6m ago",
    },
    {
      action: "Created",
      user: "User3",
      timeAgo: "7m ago",
    },
    {
      action: "Moved",
      user: "User4",
      timeAgo: "8m ago",
    },
  ].map((item, index) => (
    <div key={index} className="dash-item">
      <div className="dash-item-action">{item.action}</div>
      <div className="dash-item-user">{item.user}</div>
      <div className="dash-item-time">{item.timeAgo}</div>
    </div>
  ));

  return (
    <div className="dash-page">
      <h1 className="facility-header">
        {facilityNumber
          ? `Facility ${facilityNumber[1]}`
          : "No Facility Selected"}
        {facilityNumber && (
          <img src={LiveImage} alt="Live" className="live-icon" />
        )}
      </h1>
      <DashCard
        label="ACTIVE PLANTS"
        value="2,690"
        descriptor="TOTAL"
        icon={arrowIcon}
        onClick={() => navigate("/dashplants")}
      />

      <DashCarousel headerTitle="Plants History" dashItems={dashItems} />
      <DashCard
        label="ACTIVE PACKAGES"
        value="25"
        descriptor="TOTAL"
        icon={arrowIcon}
        onClick={() => navigate("/dashpackages")}
      />
      <DashCarousel headerTitle="Packages History" dashItems={packageItems} />
      <DashCard
        label="ACTIVE TRANSFERS"
        value="25"
        descriptor="TOTAL"
        icon={arrowIcon}
        onClick={() => navigate("/dashtransfers")}
      />
      <DashCarousel headerTitle="Transfer History" dashItems={packageItems} />
    </div>
  );
}

// propTypes should be outside the function definition, but not outside of the module export.
DashPage.propTypes = {
  facility: PropTypes.string,
};

export default DashPage;
