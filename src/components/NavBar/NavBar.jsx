import { NavLink } from "react-router-dom";
import ChatIcon from "../../components/svg/ChatIcon";
import DashIcon from "../../components/svg/DashIcon";
import UserSettingsButton from "./UserSettingsButton";
import PropTypes from "prop-types";
import "./NavBar.css";
import FacilityPick from "./FacilityPick";

const NavBar = ({ selectedFacility, setSelectedFacility }) => {
  return (
    <div className="navbar-outer-wrap">
      <div className="nav-container">
        <div className="dash-chat-wrap">
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active-link active-chat" : "")
            }
          >
            <ChatIcon className="nav-icon" />
            <span>Chat</span>
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active-link active-dash" : "")
            }
          >
            <DashIcon className="nav-icon" />
            <span>Dashboard</span>
          </NavLink>
        </div>
        <UserSettingsButton />
      </div>
      <FacilityPick
        selectedFacility={selectedFacility}
        setSelectedFacility={setSelectedFacility}
      />
    </div>
  );
};

NavBar.propTypes = {
  selectedFacility: PropTypes.string,
  setSelectedFacility: PropTypes.func.isRequired,
};

export default NavBar;
