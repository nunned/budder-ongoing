// QuickActions.js
import { useState } from "react";
import "./QuickActions.css"; // Make sure to create a corresponding CSS file

function QuickActions() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDestroyModal, setShowDestroyModal] = useState(false);

  return (
    <div className="quick-actions-container">
      <button
        className="quick-actions-button"
        onClick={() => setShowCreateModal(true)}
      >
        CREATE
      </button>
      <button
        className="quick-actions-button"
        onClick={() => setShowUpdateModal(true)}
      >
        UPDATE
      </button>
      <button
        className="quick-actions-button"
        onClick={() => setShowDestroyModal(true)}
      >
        DESTROY
      </button>

      {showCreateModal && (
        <div className="quick-actions-modal">
          <div className="quick-actions-modal-content">
            <span
              className="quick-actions-modal-close"
              onClick={() => setShowCreateModal(false)}
            >
              Close Create Modal
            </span>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="quick-actions-modal">
          <div className="quick-actions-modal-content">
            <span
              className="quick-actions-modal-close"
              onClick={() => setShowUpdateModal(false)}
            >
              Close Update Modal
            </span>
          </div>
        </div>
      )}

      {showDestroyModal && (
        <div className="quick-actions-modal">
          <div className="quick-actions-modal-content">
            <span
              className="quick-actions-modal-close"
              onClick={() => setShowDestroyModal(false)}
            >
              Close Destroy Modal
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickActions;
