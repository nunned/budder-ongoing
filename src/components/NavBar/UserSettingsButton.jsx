import { useState } from 'react';
import userIcon from '../../assets/user.svg'; 
import downArrow from '../../assets/arrowdown.svg';

const UserSettingsButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(!showModal)}>
        <img src={userIcon} alt="User" />
        <img src={downArrow} alt="Dropdown" />
      </button>

      {showModal && (
        <div className="modal">
          <ul>
            <li>Placeholder 1</li>
            <li>Placeholder 2</li>
            <li>Placeholder 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserSettingsButton;
