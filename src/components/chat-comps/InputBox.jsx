import { useState } from "react";
import PropTypes from 'prop-types';
import "../../pages/ChatPage.css";

function InputBox({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

InputBox.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default InputBox;
