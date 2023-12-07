import "./dashpage-styles.css";
import DashCard from "../../components/dash-comps/DashCard";
import LiveImage from "../../assets/LiveImage.svg";
import QuickActions from "../../components/dash-comps/QuickActions";
import DashCarousel from "../../components/Carousel/DashCarousel";

function DashPlants() {
  // Sample data for rooms
  const roomData = [
    <div key="room1" className="room-item">
      Room 1
    </div>,
    <div key="room2" className="room-item">
      Room 2
    </div>,
    <div key="room3" className="room-item">
      Room 3
    </div>,
    // ... additional rooms
  ];

  const plantItems = [
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

  return (
    <div className="dash-plants-wrap">
      <h1 className="dash-plants-header">
        Plants
        <img src={LiveImage} alt="Live" className="live-icon" />
      </h1>
      <DashCard
        className="dash-plants-card"
        label="ACTIVE PLANTS"
        value="2,690"
        descriptor="TOTAL"
      />
      <QuickActions />
      <DashCarousel headerTitle="Rooms" dashItems={roomData} />
      {/* stages */}
      <DashCarousel headerTitle="Plants History" dashItems={plantItems} />
    </div>
  );
}

export default DashPlants;
