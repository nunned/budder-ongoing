import "./dashpage-styles.css";
import DashCard from "../../components/dash-comps/DashCard";
import LiveImage from "../../assets/LiveImage.svg";
import QuickActions from "../../components/dash-comps/QuickActions";

function DashPlants() {
  return (
    <div className="dash-plants-wrap">
      <h1 className="dash-plants-header">
        Plants
        <img src={LiveImage} alt="Live" className="live-icon" />
      </h1>
      <DashCard
        className="dash-plants-card" // Add this line
        label="ACTIVE PLANTS"
        value="2,690"
        descriptor="TOTAL"
      />
      <QuickActions />
    </div>
  );
}

export default DashPlants;
